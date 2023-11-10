import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import {
  API_ENDPOINTS,
  API_TAGS,
  CONTROLLERS,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';
import { firstValueFrom } from 'rxjs';
import { CreateDashboardtDTO, IdDto, ListDashboardDTO } from '@shared/dto';

@ApiTags(API_TAGS.AIR_SERVICES_DASHBOARD)
@Controller(CONTROLLERS.AIR_SERVICES_DASHBOARD)
export class AirServicesDashboardController {
  constructor(
    @Inject(SERVICES.AIR_SERVICES) private ariServiceClient: ClientProxy
  ) {}

  @Post(API_ENDPOINTS.AIR_SERVICES.DASHBOARD.ADD_DASHBOARD)
  public async createDashboard(@Body() dashboardDTO: CreateDashboardtDTO) {
    try {
      const dashboard = await firstValueFrom(
        this.ariServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.DASHBOARD.CREATE_DASHBOARD,
          dashboardDTO
        )
      );
      return dashboard;
    } catch (err) {
      throw new RpcException(err);
    }
  }

  @Get(API_ENDPOINTS.AIR_SERVICES.DASHBOARD.GET_DASHBOARDS)
  public async getDashboardList(@Query() listDashboardDTO: ListDashboardDTO) {
    try {
      const dashboardList = await firstValueFrom(
        this.ariServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.DASHBOARD.GET_DASHBOARD_LIST,
          listDashboardDTO
        )
      );
      return dashboardList;
    } catch (err) {
      throw new RpcException(err);
    }
  }

  @Get(API_ENDPOINTS.AIR_SERVICES.DASHBOARD.GET_DASHBOARD)
  @ApiParam({
    type: String,
    name: 'id',
    description: 'id should be dashboard id',
  })
  public async getDashboardView(@Param() id: IdDto) {
    try {
      const dashboardList = await firstValueFrom(
        this.ariServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.DASHBOARD.GET_DASHBOARD,
          {
            id,
          }
        )
      );
      return dashboardList;
    } catch (err) {
      throw new RpcException(err);
    }
  }
}
