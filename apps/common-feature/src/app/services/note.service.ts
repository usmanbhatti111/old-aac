import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { NoteRepository } from '@shared';
import { MODEL, ResponseMessage, successResponse } from '@shared/constants';
import {
  CreateNoteDto,
  DeleteNoteDto,
  GetNoteDto,
  GetNotesDto,
  MediaObject,
  UpdateNoteDto,
} from '@shared/dto';
import { S3Service } from '@shared/services';

@Injectable()
export class NoteService {
  constructor(
    private readonly noteRepository: NoteRepository,
    private readonly s3: S3Service
  ) {}

  async createNote(payload: CreateNoteDto) {
    try {
      const { file } = payload;
      if (file) {
        const s3Response = await this.s3.uploadFile(file, 'notes/{uuid}');

        const fileObject: MediaObject = {
          ...s3Response,
          size: file.size,
          mimetype: file.mimetype,
        };

        payload.file = fileObject;
      }

      const res = await this.noteRepository.create(payload);
      return successResponse(HttpStatus.CREATED, ResponseMessage.CREATED, res);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getNotes(payload: GetNotesDto) {
    try {
      const { search } = payload;

      const filterQuery = {
        isDeleted: false,
        recordId: payload?.recordId,
        createdBy: payload.createdBy,
      };

      if (search) {
        const keyword = { $regex: search, $options: 'i' };
        filterQuery['$or'] = [
          {
            title: keyword,
          },
          {
            description: keyword,
          },
        ];
      }

      const pipelines = [
        {
          $lookup: {
            from: MODEL.USER,
            localField: 'createdBy',
            foreignField: '_id',
            as: 'user',
            pipeline: [
              {
                $project: {
                  _id: 1,
                  name: {
                    $reduce: {
                      input: ['$firstName', '$middleName', '$lastName'],
                      initialValue: '',
                      in: {
                        $cond: {
                          if: { $ne: ['$$this', null] },
                          then: { $concat: ['$$value', ' ', '$$this'] },
                          else: '$$value',
                        },
                      },
                    },
                  },
                  // replace logo with user field when profile image add in user model
                  profileImage: { $ifNull: ['$logo', ''] },
                },
              },
            ],
          },
        },
        {
          $unwind: {
            path: '$user',
            preserveNullAndEmptyArrays: true,
          },
        },
      ];

      const limit = payload?.limit;
      const offset = payload?.page;

      const res = await this.noteRepository.paginate({
        filterQuery,
        offset,
        limit,
        pipelines,
      });

      const response = successResponse(
        HttpStatus.OK,
        ResponseMessage.SUCCESS,
        res
      );

      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getNote(payload: GetNoteDto) {
    try {
      const { id } = payload;

      const filter = {
        _id: id,
        createdBy: payload.createdBy,
        isDeleted: false,
      };

      const res = await this.noteRepository.findOne(filter);

      const response = successResponse(
        HttpStatus.OK,
        ResponseMessage.SUCCESS,
        res
      );

      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async updateNote(payload: UpdateNoteDto) {
    try {
      const { id, file } = payload;

      const filter = {
        _id: id,
        createdBy: payload?.updatedBy,
        isDeleted: false,
      };

      let res = await this.noteRepository.findOne(filter);

      if (file) {
        if (res?.file) {
          const { url } = res.file;
          await this.s3.deleteFile(url);
          const s3Response = await this.s3.uploadFile(file, 'notes/{uuid}');

          const fileObject: MediaObject = {
            ...s3Response,
            size: file?.size,
            mimetype: file?.mimetype,
          };

          payload.file = fileObject;
        } else {
          const s3Response = await this.s3.uploadFile(file, 'notes/{uuid}');

          const fileObject: MediaObject = {
            ...s3Response,
            size: file.size,
            mimetype: file.mimetype,
          };

          payload.file = fileObject;
        }
      }

      res = await this.noteRepository.findOneAndUpdate(filter, payload);

      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, res);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async deleteNote(payload: DeleteNoteDto) {
    try {
      const { id, deletedBy } = payload;

      const filter = { _id: id, createdBy: deletedBy, isDeleted: false };

      const data = { isDeleted: true, deletedBy };

      await this.noteRepository.findOneAndUpdate(filter, data);

      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, {});
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
