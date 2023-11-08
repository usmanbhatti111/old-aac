import { HttpStatus, Injectable } from '@nestjs/common';
import { errorResponse, successResponse } from '@shared/constants';
import { InventoryRepository, mongooseDateFilter } from '@shared';
import {
  GetInventoryDto,
  IdDto,
  PaginationDto,
  GetInventoryAssociateDto,
  SearchInventoryDto,
} from '@shared/dto';
import { Types } from 'mongoose';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class InventoryService {
  constructor(private inventoryRepository: InventoryRepository) {}

  async addInventory(payload: any) {
    try {
      const res = await this.inventoryRepository.create({ ...payload });
      return successResponse(HttpStatus.CREATED, 'Success', res);
    } catch (error) {
      return errorResponse(HttpStatus.BAD_REQUEST, 'Bad Request', error?.name);
    }
  }

  async searchInventory(payload: SearchInventoryDto) {
    try {
      const { limit, page, displayName } = payload;
      let filterQuery = {};
      const offset = limit * (page - 1);
      if (displayName) {
        filterQuery = {
          displayName: {
            $regex: displayName,
            $options: 'i',
          },
        };
      }

      const res = await this.inventoryRepository.paginate({
        filterQuery,
        offset,
        limit,
      });
      return successResponse(HttpStatus.CREATED, 'Success', res);
    } catch (error) {
      return errorResponse(HttpStatus.BAD_REQUEST, 'Bad Request', error?.name);
    }
  }

  async editInventory(payload) {
    try {
      const { id, updateDataDto } = payload;
      const res = await this.inventoryRepository.findByIdAndUpdate(
        { _id: id },
        { $set: updateDataDto }
      );
      return successResponse(HttpStatus.CREATED, 'Success', res);
    } catch (error) {
      return errorResponse(HttpStatus.BAD_REQUEST, 'Bad Request', error?.name);
    }
  }

  async getInventory(payload?: GetInventoryDto) {
    try {
      const {
        impact,
        locationId,
        limit,
        page,
        usedBy,
        departmentId,
        search,
        assetType,
        createdAt,
        updatedAt,
      } = payload;
      let filterQuery = {};
      if (impact) {
        filterQuery['impact'] = impact;
      }
      if (departmentId) {
        filterQuery['departmentId'] = new Types.ObjectId(departmentId);
      }

      if (usedBy) {
        filterQuery['usedBy'] = new Types.ObjectId(usedBy);
      }
      if (assetType) {
        filterQuery['assetType'] = assetType;
      }
      if (locationId) {
        filterQuery['locationId'] = new Types.ObjectId(locationId);
      }
      if (search) {
        filterQuery = {
          displayName: {
            $regex: search,
            $options: 'i',
          },
        };
      }

      let expiryFilter = {};
      const pipeline: any = [
        {
          $lookup: {
            from: 'attachments',
            localField: 'attachments',
            foreignField: '_id',
            as: 'attachmentDetails',
          },
        },
        {
          $unwind: {
            path: '$attachmentDetails',
            preserveNullAndEmptyArrays: true,
          },
        },
      ];

      if (updatedAt) {
        expiryFilter = mongooseDateFilter(updatedAt, 'updatedAt');
        pipeline.push({ $match: expiryFilter });
      }
      if (createdAt) {
        expiryFilter = mongooseDateFilter(createdAt, 'createdAt');
        pipeline.push({ $match: expiryFilter });
      }
      const res = await this.inventoryRepository.newPaginate(
        filterQuery,
        pipeline,
        {
          page,
          limit,
        }
      );

      return successResponse(HttpStatus.CREATED, 'Success', res);
    } catch (error) {
      return errorResponse(HttpStatus.BAD_REQUEST, 'Bad Request', error?.name);
    }
  }
  async getAssociateInventoryList(payload?: GetInventoryAssociateDto) {
    try {
      const { deviceId, limit, page, search } = payload;
      let filterQuery = {};
      const offset = limit * (page - 1);
      if (deviceId) {
        filterQuery = {
          deviceIds: {
            $in: [new Types.ObjectId(deviceId)],
          },
        };
      }
      if (search) {
        filterQuery = {
          displayName: {
            $regex: search,
            $options: 'i',
          },
        };
      }
      const res = await this.inventoryRepository.paginate({
        filterQuery,
        offset,
        limit,
      });

      return successResponse(HttpStatus.CREATED, 'Success', res);
    } catch (error) {
      return errorResponse(HttpStatus.BAD_REQUEST, 'Bad Request', error?.name);
    }
  }

  async deleteInventory(payload: { ids: string[] }) {
    try {
      const res = await this.inventoryRepository.deleteMany({}, payload.ids);

      return successResponse(HttpStatus.OK, 'Success', res);
    } catch (error) {
      return errorResponse(HttpStatus.BAD_REQUEST, 'Bad Request', error?.name);
    }
  }
  async getInventorySoftwareDetails(payload: {
    id: IdDto;
    pagination: PaginationDto;
  }) {
    try {
      const { id } = payload.id;
      const { limit } = payload.pagination;
      const offset = payload.pagination.page;
      const filterQuery = { _id: new Types.ObjectId(id) };
      const pipelines = [
        {
          $lookup: {
            from: 'assetssoftwares',
            localField: 'deviceIds',
            foreignField: '_id',
            as: 'inventorySoftwares',
          },
        },
        {
          $project: {
            inventorySoftwares: 1,
            _id: 0,
          },
        },
        {
          $unwind: {
            path: '$inventorySoftwares',
          },
        },
      ];
      const inventorySoftware = await this.inventoryRepository.paginate({
        filterQuery,
        pipelines,
        limit,
        offset,
      });
      const response = successResponse(
        HttpStatus.OK,
        `inventory Software Details Successfully`,
        inventorySoftware
      );
      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
