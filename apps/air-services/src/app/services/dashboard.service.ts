import { HttpStatus, Injectable } from '@nestjs/common';
import {
  DashboardRepository,
  EmailedDashboardsRepository,
  TicketRepository,
} from '@shared';
import { RpcException } from '@nestjs/microservices';
import {
  CreateDashboardtDTO,
  IdDto,
  ListDashboardDTO,
  FilterTicketDto,
} from '@shared/dto';
import { successResponse } from '@shared/constants';

@Injectable()
export class DashboardService {
  constructor(
    private readonly dashboardRepository: DashboardRepository,
    private readonly emailedDashboardsRepository: EmailedDashboardsRepository,
    private readonly ticketRepository: TicketRepository
  ) {}

  async addDashboard(payload: CreateDashboardtDTO) {
    try {
      const res = await this.dashboardRepository.create(payload);
      return res;
    } catch (error) {
      return new RpcException(error);
    }
  }

  async sendDashboard(payload) {
    try {
      const res = await this.emailedDashboardsRepository.create(payload);
      const response = successResponse(HttpStatus.CREATED, `Success`, res);
      return response;
    } catch (error) {
      return new RpcException(error);
    }
  }

  async getDashboardList(payload: ListDashboardDTO) {
    try {
      const { limit, page, search } = payload;
      const offset = limit * (page - 1);
      const filterQuery = {};
      const pipeline: any = [];

      if (search) {
        pipeline.push({
          $match: {
            name: { $regex: search, $options: 'i' },
          },
        });
      }
      const res = await this.dashboardRepository.paginate({
        filterQuery,
        offset,
        limit,
        pipelines: pipeline,
      });
      return res;
    } catch (error) {
      return new RpcException(error);
    }
  }

  async getDashboardById(payload: IdDto) {
    try {
      const res = await this.dashboardRepository.findOne(payload);
      return res;
    } catch (error) {
      return new RpcException(error);
    }
  }
  async getDashboardTickets(payload: FilterTicketDto) {
    try {
      const dateField = 'createdAt';
      const filterField = payload.filterBy === 'status' ? 'status' : 'pirority';

      const pipeline: any[] = [
        {
          $group: {
            _id: {
              year: { $year: `$${dateField}` },
              month: { $month: `$${dateField}` },
              [filterField]: `$${filterField}`,
            },
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            year: '$_id.year',
            month: '$_id.month',
            [filterField]: `$_id.${filterField}`,
            count: 1,
          },
        },
      ];

      const monthlyStats = await this.ticketRepository.aggregate(pipeline);

      const totalTicketsPipeline: any[] = [
        {
          $group: {
            _id: {
              year: { $year: `$${dateField}` },
            },
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            year: '$_id.year',
            count: 1,
          },
        },
      ];

      const totalTickets = await this.ticketRepository.aggregate(
        totalTicketsPipeline
      );

      return {
        [`${filterField}Stats`]: monthlyStats,
        totalTickets,
      };
    } catch (error) {
      return new RpcException(error);
    }
  }
}
