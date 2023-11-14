import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ActivitylogsRepository } from '@shared';
import { ResponseMessage, successResponse } from '@shared/constants';
import { ActivityLogParams, GetallActivitylogDTO } from '@shared/dto';
import dayjs from 'dayjs';
import { Types } from 'mongoose';

@Injectable()
export class ActivitylogsService {
  constructor(private activitylogRepository: ActivitylogsRepository) {}

  async activityLog(payload: ActivityLogParams) {
    try {
      const {
        performedBy,
        activityType,
        module,
        moduleId,
        moduleName,
        organizationId,
      } = payload;

      const params: ActivityLogParams = {
        organizationId,
        performedBy, // userId
        activityType, // CREATED, UPDATED
        module, // PLANS, DEALS, INVOICES
        moduleId, // module Id
        moduleName, // module Name
      };
      const result = await this.activitylogRepository.create(params);
      return result;
    } catch (error) {
      return error;
    }
  }

  async getallActivities(payload: GetallActivitylogDTO) {
    try {
      const {
        performedBy,
        activityType,
        module,
        search,
        page,
        limit,
        userRole,
        startDate,
        endDate,
      } = payload;
      const offset = (page - 1) * limit;
      let filterQuery = {};

      if (startDate && endDate) {
        const filterStartDate = dayjs(startDate).startOf('day').toDate();
        const filterEndDate = dayjs(endDate).endOf('day').toDate();
        filterQuery['createdAt'] = {
          $gte: filterStartDate,
          $lte: filterEndDate,
        };
      }

      if (performedBy) {
        filterQuery['performedBy'] = new Types.ObjectId(performedBy);
      }

      if (activityType) {
        filterQuery['activityType'] = activityType;
      }

      if (userRole) {
        filterQuery['performedByRole'] = userRole;
      }

      if (module) {
        filterQuery['secondModuleName'] = module;
      }

      if (search) {
        filterQuery = {
          $or: [
            { performedByName: { $regex: search, $options: 'i' } },
            { secondModuleDisplayName: { $regex: search, $options: 'i' } },
          ],
        };
      }

      const pipelines = [
        {
          $lookup: {
            from: 'users',
            localField: 'performedBy',
            foreignField: '_id',
            as: 'performedByData',
          },
        },
        {
          $addFields: {
            performedByData: {
              $arrayElemAt: ['$performedByData', 0],
            },
          },
        },
        {
          $addFields: {
            performedByRole: '$performedByData.role',
            performedByName: {
              $concat: [
                '$performedByData.firstName',
                ' ',
                '$performedByData.lastName',
              ],
            },
          },
        },
        {
          $addFields: {
            displayStringT1: {
              $concat: [
                '$moduleName',
                ' ',
                '$activityType',
                ' by ',
                '$performedByName',
              ],
            },
            displayStringT2: {
              $concat: [
                '$performedByName',
                ' ',
                '$activityType',
                ' a ',
                '$moduleName',
              ],
            },
          },
        },
        {
          $addFields: {
            displayStringT1: {
              $toLower: '$displayStringT1',
            },
            displayStringT2: {
              $toLower: '$displayStringT2',
            },
          },
        },
        {
          $project: {
            _id: 1,
            performedBy: 1,
            performedByName: 1,
            performedByRole: 1,
            activityType: 1,
            module: 1,
            moduleId: 1,
            moduleName: 1,
            // displayStringT1:1,
            // displayStringT2:1,
            createdAt: 1,
          },
        },
        {
          $match: filterQuery,
        },
      ];
      const params = {
        pipelines,
        offset: isNaN(offset) ? null : offset,
        limit,
      };

      const result = await this.activitylogRepository.paginate(params);

      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, result);
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
