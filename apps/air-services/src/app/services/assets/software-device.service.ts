import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InventoryRepository } from '@shared';
import { successResponse } from '@shared/constants';
import { Types } from 'mongoose';

@Injectable()
export class SoftwareDeviceService {
  constructor(private InventoryRepository: InventoryRepository) {}

  async addSoftwareDevice(payload) {
    try {
      const { id, softwareId } = payload;
      const response = await this.InventoryRepository.findOneAndUpdate(
        { _id: id },
        {
          $push: { deviceIds: softwareId.softwareId },
          $set: { installationDate: new Date() },
        }
      );
      return successResponse(HttpStatus.OK, 'Success', response);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getSoftwareDevices(payload) {
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
      const pipelines: any = [
        {
          $lookup: {
            from: 'users',
            localField: 'usedBy',
            foreignField: '_id',
            as: 'users',
          },
        },
        {
          $lookup: {
            from: 'department',
            localField: 'departmentId',
            foreignField: '_id',
            as: 'department',
          },
        },
      ];
      if (search) {
        filterQuery = {
          displayName: {
            $regex: search,
            $options: 'i',
          },
        };
      }
      const response = await this.InventoryRepository.paginate({
        filterQuery,
        pipelines,
        offset,
        limit,
      });
      return successResponse(HttpStatus.OK, 'Success', response);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async removeSoftwareDevice(payload) {
    try {
      const { id, softwareId } = payload;
      const softwareInfo = await this.InventoryRepository.findOneAndUpdate(
        { _id: id },
        { $pull: { deviceIds: softwareId.softwareId } }
      );
      const response = successResponse(
        HttpStatus.OK,
        `Assets Software Deleted Successfully`,
        softwareInfo
      );
      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
