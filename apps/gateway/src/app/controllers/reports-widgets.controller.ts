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
import {
  CreateReportWidgettDTO,
  IdDto,
  ListReportWidgetDTO,
} from '@shared/dto';

@ApiTags(API_TAGS.REPORTS_WIDGETS)
@Controller(CONTROLLERS.REPORTS)
export class ReportsWidgetController {
  constructor(
    @Inject(SERVICES.AIR_SERVICES) private ariServiceClient: ClientProxy
  ) {}

  @Post(API_ENDPOINTS.AIR_SERVICES.REPORT_WIDGETS.ADD_REPORT_WIDGET)
  public async createReportWidget(@Body() widgetdDTO: CreateReportWidgettDTO) {
    try {
      const widget = await firstValueFrom(
        this.ariServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.WIDGETS.CREATE_WIDGETS,
          widgetdDTO
        )
      );
      return widget;
    } catch (err) {
      throw new RpcException(err);
    }
  }

  @Get(API_ENDPOINTS.AIR_SERVICES.REPORT_WIDGETS.GET_REPORT_WIDGETS)
  public async getReportWidgetList(
    @Query() listReportWidget: ListReportWidgetDTO
  ) {
    try {
      const widgetList = await firstValueFrom(
        this.ariServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.WIDGETS.GET_WIDGETS_LIST,
          listReportWidget
        )
      );
      return widgetList;
    } catch (err) {
      throw new RpcException(err);
    }
  }

  @Get(API_ENDPOINTS.AIR_SERVICES.REPORT_WIDGETS.GET_REPORT_WIDGET)
  @ApiParam({
    type: String,
    name: 'id',
    description: 'id should be widget id',
  })
  public async getReportWidget(@Param() id: IdDto) {
    try {
      const widget = await firstValueFrom(
        this.ariServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.WIDGETS.GET_WIDGETS,
          {
            id,
          }
        )
      );
      return widget;
    } catch (err) {
      throw new RpcException(err);
    }
  }
}
