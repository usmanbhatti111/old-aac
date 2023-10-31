import { HttpStatus, Injectable } from '@nestjs/common';
import { ResponseMessage, successResponse } from '@shared/constants';
import { TaskRepository, TicketRepository } from '@shared';
import { RpcException } from '@nestjs/microservices';
import dayjs from 'dayjs';
import { WorkLoadFilterDto } from '@shared/dto';

@Injectable()
export class WorkloadManagementService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private ticketRepository: TicketRepository
  ) {}

  async getWorkload(query: WorkLoadFilterDto) {
    try {
      const { startDate, countDayWise } = query;
      const startOfCustomRange = startDate
        ? dayjs(startDate).startOf('day')
        : null;
      const endOfCustomRange = startDate
        ? startOfCustomRange.add(1, 'week').endOf('day')
        : null;

      const pipeline: any[] = [];

      if (startDate) {
        pipeline.push({
          $match: {
            startDate: {
              $gte: startOfCustomRange.toDate(),
              $lte: endOfCustomRange.toDate(),
            },
          },
        });
      }

      if (countDayWise) {
        pipeline.push({
          $group: {
            _id: {
              year: { $year: '$startDate' },
              month: { $month: '$startDate' },
              day: { $dayOfMonth: '$startDate' },
            },
            tasks: { $push: '$$ROOT' },
            count: { $sum: 1 },
          },
        });

        if (startDate) {
          pipeline.push({
            $project: {
              _id: 0,
              year: '$_id.year',
              month: '$_id.month',
              day: '$_id.day',
              count: 1,
              tasks: 1,
            },
          });
        }
      }

      const res = await this.taskRepository.aggregate(pipeline);

      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, res);
    } catch (error) {
      return new RpcException(error);
    }
  }
}
