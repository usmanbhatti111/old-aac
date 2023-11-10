import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ReportsWidgetRepository } from '@shared';
import { IdDto } from '@shared/dto';

@Injectable()
export class ReportWidgetService {
  constructor(
    private readonly reportWidgetRepository: ReportsWidgetRepository
  ) {}

  async addReportWidget(payload: any) {
    try {
      const res = await this.reportWidgetRepository.create(payload);
      return res;
    } catch (error) {
      return new RpcException(error);
    }
  }

  async getReportWidgets(payload: any) {
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
      const res = await this.reportWidgetRepository.paginate({
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

  async getReportWidgetById(payload: IdDto) {
    try {
      const res = await this.reportWidgetRepository.findOne(payload);
      return res;
    } catch (error) {
      return new RpcException(error);
    }
  }
}
