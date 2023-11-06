import { Injectable } from '@nestjs/common';
import { DashboardRepository } from '@shared';
import { RpcException } from '@nestjs/microservices';
import { CreateDashboardtDTO, IdDto, ListDashboardDTO } from '@shared/dto';

@Injectable()
export class DashboardService {
  constructor(private readonly dashboardRepository: DashboardRepository) {}

  async addDashboard(payload: CreateDashboardtDTO) {
    try {
      const res = await this.dashboardRepository.create(payload);
      return res;
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
}
