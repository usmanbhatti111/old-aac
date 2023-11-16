import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { AssetsSoftwareRepository, SoftwareUsersRepository } from '@shared';
import { mongooseDateFilter } from '@shared';
import {
  AllocateSoftwareContractDto,
  AssetsSoftwareDto,
  GetAssetsSoftwareDetails,
  GetSoftwareUserDto,
  IdDto,
  PaginationDto,
  SoftwareUsersDto,
} from '@shared/dto';

import { successResponse } from '@shared/constants';
import { Types } from 'mongoose';

@Injectable()
export class SoftwareService {
  constructor(
    private softwareRepository: AssetsSoftwareRepository,
    private softwareUsersRepo: SoftwareUsersRepository
  ) {}

  async addSoftware(payload: AssetsSoftwareDto) {
    try {
      const { ...dto } = payload;
      const data = await this.softwareRepository.create({ ...dto });
      const response = successResponse(
        HttpStatus.CREATED,
        `Assets Software Created Successfully`,
        data
      );
      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }
  async editSoftware(payload: { id: IdDto; dto: AssetsSoftwareDto }) {
    try {
      const { id, ...dto } = payload;
      const { details, name, status, type } = dto.dto;
      const data = await this.softwareRepository.findOneAndUpdate(
        { _id: id.id },
        { $set: { details, name, type, status } }
      );
      const response = successResponse(
        HttpStatus.OK,
        `Assets Software Edit Successfully`,
        data
      );
      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async deleteSoftware(payload: { id: IdDto }) {
    try {
      const { id } = payload.id;
      const softwareInfo = await this.softwareRepository.delete({ _id: id });
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
  async getSoftware(payload: {
    dto: GetAssetsSoftwareDetails;
    pagination: PaginationDto;
  }) {
    try {
      const { search, type, status, createdDate, updatedDate } = payload.dto;
      const { limit } = payload.pagination;
      const offset = payload.pagination.page;

      let searchFilter: any;
      if (search) {
        searchFilter = {
          $or: [
            {
              name: {
                $regex: search,
                $options: 'i',
              },
            },
          ],
        };
      }
      const pipelines: any = [];
      const filterQuery = {
        ...searchFilter,
      };
      if (type) {
        filterQuery.type = type;
      }
      if (status) {
        filterQuery.status = status;
      }
      if (createdDate) {
        const filter = mongooseDateFilter(createdDate, 'createdAt');
        pipelines.push({ $match: filter });
      }
      if (updatedDate) {
        const filter = mongooseDateFilter(updatedDate, 'updatedAt');
        pipelines.push({ $match: filter });
      }

      const softwareDetails = await this.softwareRepository.paginate({
        filterQuery,
        limit,
        offset,
        pipelines,
      });
      const response = successResponse(
        HttpStatus.OK,
        `Assets Software Details Successfully`,
        softwareDetails
      );
      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async assignCatToSoftware(payload) {
    try {
      const { id, category } = payload;
      const response = await this.softwareRepository.findOneAndUpdate(
        { _id: id },
        { $set: { categoryId: category.categoryId } }
      );
      return successResponse(HttpStatus.OK, 'Success', response);
    } catch (error) {
      throw new RpcException(error);
    }
  }
  async addSoftwareUsers(payload: { dto: SoftwareUsersDto; userId: string }) {
    try {
      const { userId } = payload;
      const { ...dto } = payload;
      const { contractId } = dto.dto;

      const softwareUsers = await this.softwareUsersRepo.create({
        contractId: dto.dto.contractId,
        userRefId: dto.dto.userRefId,
        softwareId: dto.dto.softwareId,
        userId: userId,
        isContractAllocated: contractId ? true : false,
      });

      const response = successResponse(
        HttpStatus.CREATED,
        `Software Users Added Successfully`,
        softwareUsers
      );
      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }
  async getSoftwareUsers(payload: {
    id: IdDto;
    userId: string;
    dto: GetSoftwareUserDto;
  }) {
    try {
      const { id } = payload.id;
      const { limit, page, search, name, assignedDate } = payload.dto;
      const assign = new Date(assignedDate);
      const filterQuery = {
        softwareId: id,
      };
      const pipelines: any = [
        {
          $lookup: {
            from: 'users',
            localField: 'userRefId',

            foreignField: '_id',
            as: 'details',
          },
        },
        {
          $lookup: {
            from: 'contracts',
            localField: 'contractId',

            foreignField: '_id',
            as: 'contracts',
          },
        },

        {
          $unwind: '$details',
        },
        {
          $unwind: '$contracts',
        },
      ];
      if (search) {
        pipelines.push({
          $match: {
            'details.firstName': { $regex: search, $options: 'i' },
          },
        });
      }
      if (name) {
        pipelines.push({
          $match: {
            'details.firstName': { $regex: name, $options: 'i' },
          },
        });
      }
      if (assignedDate) {
        pipelines.push({
          $match: {
            createdAt: {
              $lte: new Date(assign.getTime() + 1 * 24 * 60 * 60 * 1000),
              $gte: new Date(assign.getTime()),
            },
          },
        });
      }
      const Param = {
        filterQuery,
        pipelines,
        limit,
        offset: page,
      };
      const softwareDetails = await this.softwareUsersRepo.paginate(Param);
      const response = successResponse(
        HttpStatus.OK,
        `Software Users Details Successfully`,
        softwareDetails
      );
      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async allocateSoftwareContract(payload: {
    dto: AllocateSoftwareContractDto;
    userId: string;
  }) {
    try {
      const { id, contractId } = payload.dto;

      const allocate = await this.softwareUsersRepo.findOneAndUpdate(
        { _id: id },
        { $set: { contractId, isContractAllocated: true } }
      );
      const response = successResponse(
        HttpStatus.OK,
        `Contract Allocated Successfully`,
        allocate
      );
      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async deAllocateSoftwareContract(payload: {
    dto: AllocateSoftwareContractDto;
    userId: string;
  }) {
    try {
      const { id, contractId } = payload.dto;

      const allocate = await this.softwareUsersRepo.findOneAndUpdate(
        { _id: id },
        { $unset: { contractId }, $set: { isContractAllocated: false } }
      );
      const response = successResponse(
        HttpStatus.OK,
        `Contract Deallocated Successfully`,
        allocate
      );
      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }
  async softwareUserRemove(payload: { id: IdDto }) {
    try {
      const { id } = payload.id;
      const removeUser = await this.softwareUsersRepo.delete({ _id: id });
      const response = successResponse(
        HttpStatus.OK,
        `User Remove Successfully`,
        removeUser
      );
      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }
  async softwareOverview(payload: { id: IdDto }) {
    try {
      const { id } = payload.id;

      const overview = await this.softwareRepository.aggregate([
        {
          $facet: {
            totalUsage: [
              { $match: { _id: new Types.ObjectId(id) } },
              {
                $lookup: {
                  from: 'softwareusers',
                  localField: '_id',
                  foreignField: 'softwareId',
                  as: 'users',
                },
              },
              {
                $unwind: {
                  path: '$users',
                },
              },
              {
                $count: 'count',
              },
            ],

            totalContracts: [
              { $match: { _id: new Types.ObjectId(id) } },
              {
                $lookup: {
                  from: 'softwareusers',
                  localField: '_id',
                  foreignField: 'softwareId',
                  as: 'users',
                },
              },
              { $addFields: { contract: '$users.contractId' } },
              {
                $project: {
                  users: 0,
                },
              },
              {
                $unwind: {
                  path: '$contract',
                },
              },
              {
                $count: 'count',
              },
            ],
          },
        },
        {
          $unwind: {
            path: '$totalUsage',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $unwind: {
            path: '$totalContracts',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            usageActivity: {
              $cond: {
                if: { $eq: [{ $type: '$totalUsage.count' }, 'int'] },
                then: '$totalUsage.count',
                else: 0,
              },
            },

            contractUtilization: {
              $cond: {
                if: { $eq: [{ $type: '$totalContracts.count' }, 'int'] },
                then: '$totalContracts.count',
                else: 0,
              },
            },
          },
        },
      ]);

      const response = successResponse(
        HttpStatus.OK,
        `Software recieved`,
        overview
      );

      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
