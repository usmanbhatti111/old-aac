import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { NoteRepository } from '@shared';
import { ResponseMessage, successResponse } from '@shared/constants';
import {
  CreateNoteDto,
  DeleteNoteDto,
  UpdateNoteDto,
  GetNotesDto,
  IdDto,
} from '@shared/dto';

@Injectable()
export class NoteService {
  constructor(private noteRepository: NoteRepository) {}

  async createNote(payload: CreateNoteDto) {
    try {
      const existingNote = await this.noteRepository.find({
        title: payload?.title,
      });
      if (existingNote.length > 0) {
        return new ConflictException(
          'Note with the same title already exist.'
        );
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

      const filterQuery = { isDeleted: false };

      if (search) {
        const keyword = { $regex: search, $options: 'i' };
        filterQuery['$or'] = [
          {
            title: keyword,
          },
          {
            description: keyword,
          }
        ];
      }

      let { limit, page } = payload;
      limit = limit ? limit : 10;
      page = page ? page : 1;
      const offset = limit * (page - 1);

      const res = await this.noteRepository.paginate({
        filterQuery,
        offset,
        limit,
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

  async getNote(payload: IdDto) {
    try {
      const { id } = payload;

      const filter = { _id: id };

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
      const { id } = payload;

      const filter = { _id: id };

      const res = await this.noteRepository.findOneAndUpdate(
        filter,
        payload
      );

      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, res);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async deleteNote(payload: DeleteNoteDto) {
    try {
      const { id, deletedBy } = payload;

      const filter = { _id: id };

      const data = { isDeleted: true, deletedBy };

      await this.noteRepository.findOneAndUpdate(filter, data);

      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, {});
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
