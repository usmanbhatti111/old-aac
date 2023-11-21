import { Body, Controller, Get, Inject, Put, Query, Req } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  API_ENDPOINTS,
  API_TAGS,
  CONTROLLERS,
  EActivityType,
  EActivitylogModule,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';
import {
  ActivityLogParams,
  CreateDealCuztomizeColumnDto,
  CreateDealCuztomizeColumnResponseDto,
  GetCustomizedColumns,
  GetCustomizedColumnsResponseDto,
} from '@shared/dto';
import { firstValueFrom } from 'rxjs';
import { Auth } from '../decorators/auth.decorator';
import { AppRequest } from '../shared/interface/request.interface';

@ApiBearerAuth()
@ApiTags(API_TAGS.CUSTOMIZED_COLUMNS)
@Controller(CONTROLLERS.CUSTOMIZED_COLUMNS)
export class CustomizedColumnsController {
  constructor(
    @Inject(SERVICES.COMMON_FEATURE)
    private commonFeatures: ClientProxy
  ) {}

  @Auth(true)
  @Get(API_ENDPOINTS.CUSTOMIZED_COLUMNS.GET_CUSTOMIZE_COLUMN)
  @ApiOkResponse({ type: GetCustomizedColumnsResponseDto })
  public async getCustomizedColumns(
    @Req() request: AppRequest,
    @Query() payload: GetCustomizedColumns
  ): Promise<GetCustomizedColumnsResponseDto> {
    payload.userId = request?.user?._id;

    const response = await firstValueFrom(
      this.commonFeatures.send(
        RMQ_MESSAGES.CUSTOMIZED_COLUMNS.GET_CUSTOMIZE_COLUMN,
        payload
      )
    );

    return response;
  }

  @Auth(true)
  @Put(API_ENDPOINTS.SALES.DEALS.CREATE_OR_UPDATE_CUSTOMIZE_COLUMN)
  @ApiOkResponse({ type: CreateDealCuztomizeColumnResponseDto })
  public async createOrUpdateCustomizeColumn(
    @Req() request: AppRequest,
    @Body() payload: CreateDealCuztomizeColumnDto
  ): Promise<CreateDealCuztomizeColumnResponseDto> {
    if (payload?.userId === request?.user?._id) {
      payload.userId = request?.user?._id;
    } else {
      delete payload?.userId;
    }

    const response = await firstValueFrom(
      this.commonFeatures.send(
        RMQ_MESSAGES.CUSTOMIZED_COLUMNS.CREATE_OR_UPDATE_CUSTOMIZE_COLUMN,
        payload
      )
    );

    //ActivityLog
    if (response?.data) {
      const params: ActivityLogParams = {
        performedBy: request?.user?._id, // userId
        activityType: EActivityType.CREATED, // UPDATED
        module: EActivitylogModule.CUSTOMIZED_COLUMNS, // module
        moduleId: response?.data?._id, // module._id
        moduleName: response?.data?.name || 'Subscription', //module.name
      };
      firstValueFrom(
        this.commonFeatures.emit(RMQ_MESSAGES.ACTIVITY_LOG.ACTIVITY_LOG, {
          ...params,
        })
      );
      response.data.activity = true;
    }

    return response;

    return response;
  }
}
