import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { FileRepository, FolderRepository } from '@shared';
import { MODEL, ResponseMessage, successResponse } from '@shared/constants';
import {
  EditFileDto,
  EditFolderDto,
  FilterFolderDto,
  FilterFilesDto,
} from '@shared/dto';
import mongoose from 'mongoose';

@Injectable()
export class DocumentsService {
  constructor(
    private folderRepository: FolderRepository,
    private fileRepository: FileRepository
  ) {}
  async createFolder(payload: any) {
    try {
      const res = await this.folderRepository.create({ ...payload });
      const response = successResponse(
        HttpStatus.CREATED,
        ResponseMessage.CREATED,
        res
      );
      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }
  async createFile(payload: any) {
    payload.folderId = new mongoose.Types.ObjectId(payload.folderId);
    try {
      const res = await this.fileRepository.create({ ...payload });
      const response = successResponse(
        HttpStatus.CREATED,
        ResponseMessage.CREATED,
        res
      );
      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getFolders(payload: FilterFolderDto) {
    try {
      const { page, limit, search, parentFolderId, organizationId } = payload;
      const offset = limit * (page - 1);
      delete payload.page;
      delete payload.limit;
      delete payload.search;

      let res;
      const pipelines = [];
      let filterQuery;
      if (parentFolderId) {
        pipelines.push({
          $match: {
            parentFolderId: new mongoose.Types.ObjectId(parentFolderId),
          },
        });
      } else {
        let searchFilter;
        if (search) {
          searchFilter = {
            name: {
              $regex: search,
              $options: 'i',
            },
          };
        }

        const parentIdIsNullFilter = {
          parentFolderId: null,
          organizationId: new mongoose.Types.ObjectId(organizationId),
        };

        filterQuery = {
          ...payload,
          ...searchFilter,
          ...parentIdIsNullFilter,
        };
      }

      pipelines.push(
        {
          $lookup: {
            from: 'users',
            localField: 'createdBy',
            foreignField: '_id',
            as: 'createdBy',
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            parentFolderId: 1,
            createdAt: 1,
            updatedAt: 1,
            createdBy: {
              $mergeObjects: [
                {
                  userId: { $arrayElemAt: ['$createdBy._id', 0] },
                  firstName: { $arrayElemAt: ['$createdBy.firstName', 0] },
                  lastName: { $arrayElemAt: ['$createdBy.firstName', 0] },
                  email: { $arrayElemAt: ['$createdBy.email', 0] },
                  role: { $arrayElemAt: ['$createdBy.role', 0] },
                },
              ],
            },
          },
        }
      );

      if (parentFolderId) {
        res = await this.folderRepository.aggregate(pipelines);
      } else {
        res = await this.folderRepository.paginate({
          filterQuery,
          offset,
          limit,
          pipelines,
        });
      }

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

  async deleteFolders(payload: { ids: string[] }) {
    let folderIds: string[] = [];

    if (typeof payload.ids === 'string') {
      folderIds.push(payload.ids);
    } else {
      folderIds = payload.ids;
    }
    try {
      const newfolderIds = folderIds.map(
        (id) => new mongoose.Types.ObjectId(id)
      );

      const foldersToDelete = await this.folderRepository.aggregate([
        {
          $match: {
            _id: { $in: newfolderIds },
          },
        },
        {
          $graphLookup: {
            from: MODEL.FOLDER,
            startWith: '$_id',
            connectFromField: '_id',
            connectToField: 'parentFolderId',
            as: 'subFolders',
          },
        },
      ]);

      const extractFolderIds = (folderTree: any) => {
        const folderIds = [];

        function extractIdsRecursive(node: {
          _id: any;
          subFolders: string | any[];
        }) {
          if (node._id) {
            folderIds.push(node._id);
          }
          if (node.subFolders && node.subFolders.length > 0) {
            for (const subfolder of node.subFolders) {
              extractIdsRecursive(subfolder);
            }
          }
        }

        for (const folder of folderTree) {
          extractIdsRecursive(folder);
        }

        return folderIds;
      };

      await this.fileRepository.deleteMany(
        {},
        extractFolderIds(foldersToDelete),
        'folderId'
      );
      const res = await this.folderRepository.deleteMany(
        {},
        extractFolderIds(foldersToDelete)
      );

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

  async getFiles(payload: FilterFilesDto) {
    try {
      const { page, limit, search, folderId } = payload;

      const offset = limit * (page - 1);
      delete payload.page;
      delete payload.limit;
      delete payload.search;

      let searchFilter;
      if (search) {
        searchFilter = {
          name: {
            $regex: search,
            $options: 'i',
          },
        };
      }

      const folderIdFilter = {
        folderId: new mongoose.Types.ObjectId(folderId),
      };

      const filterQuery = {
        ...payload,
        ...searchFilter,
        ...folderIdFilter,
      };

      const pipelines = [
        {
          $lookup: {
            from: 'users',
            localField: 'createdBy',
            foreignField: '_id',
            as: 'createdBy',
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            media: 1,
            folderId: 1,
            organizationId: 1,
            sharedLinks: 1,
            readsCount: 1,
            createdAt: 1,
            updatedAt: 1,
            createdBy: {
              $mergeObjects: [
                {
                  userId: { $arrayElemAt: ['$createdBy._id', 0] },
                  firstName: { $arrayElemAt: ['$createdBy.firstName', 0] },
                  lastName: { $arrayElemAt: ['$createdBy.firstName', 0] },
                  email: { $arrayElemAt: ['$createdBy.email', 0] },
                  role: { $arrayElemAt: ['$createdBy.role', 0] },
                },
              ],
            },
          },
        },
      ];

      const response = await this.fileRepository.paginate({
        filterQuery,
        offset,
        limit,
        pipelines,
      });

      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, response);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async deleteFiles(payload: { ids: string[] }) {
    try {
      const res = await this.fileRepository.deleteMany({}, payload.ids);

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

  async editFolder(payload: EditFolderDto) {
    try {
      const { id } = payload;

      const filter = { _id: id };

      delete payload.id;

      const finalPayload = {
        ...payload,
        updatedAt: Date.now(),
      };

      const res = await this.folderRepository.findByIdAndUpdate(
        filter,
        finalPayload
      );

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

  async editFile(payload: EditFileDto) {
    try {
      const { id, incrementReadCount, incrementSharedLinkCount } = payload;

      const filter = { _id: id };

      delete payload.id;

      let finalPayload: any;
      if (incrementReadCount || incrementSharedLinkCount) {
        const res = await this.fileRepository.find(filter);

        if (incrementReadCount) {
          res[0].readsCount++;
        } else {
          res[0].sharedLinks++;
        }

        finalPayload = {
          ...res[0],
          updatedAt: Date.now(),
        };
      } else {
        finalPayload = {
          ...payload,
          updatedAt: Date.now(),
        };
      }

      const res = await this.fileRepository.findOneAndUpdate(
        filter,
        finalPayload
      );

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
}
