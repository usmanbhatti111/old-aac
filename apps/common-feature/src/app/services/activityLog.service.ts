import { HttpStatus, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { RpcException } from '@nestjs/microservices';
import { ActivityLogRepository, ICreateActivityLog } from '@shared';
import { GetActivityLogDto } from '@shared/dto';
import { successResponse } from '@shared/constants';

@Injectable()
export class ActivityLogService {
  constructor(private readonly activityLogRepository: ActivityLogRepository) {}

  async createActivityLog(data: ICreateActivityLog) {
    const { entityId, performedBy } = data;
    const payload: any = {
      ...data,
      entityId: new Types.ObjectId(entityId),
      performedBy: new Types.ObjectId(performedBy),
    };
    return await this.activityLogRepository.create(payload);
  }

  async getActivityLog(payload: GetActivityLogDto) {
    try {
      const { entityId, page, limit } = payload;
      const pipelines = [
        {
          $match: {
            entityId: new Types.ObjectId(entityId),
          },
        },
      ];
      const response = await this.activityLogRepository.paginate({
        filterQuery: {},
        offset: page,
        limit,
        pipelines,
      });
      return successResponse(HttpStatus.OK, 'Activity logs list', response);
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
