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
  CreateCustomizeColumnDto,
  CreateCuztomizeColumnResponseDto,
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
  @Put(API_ENDPOINTS.CUSTOMIZED_COLUMNS.CREATE_OR_UPDATE_CUSTOMIZE_COLUMN)
  @ApiOkResponse({ type: CreateCuztomizeColumnResponseDto })
  public async createOrUpdateCustomizeColumn(
    @Req() request: AppRequest,
    @Body() payload: CreateCustomizeColumnDto
  ): Promise<CreateCuztomizeColumnResponseDto> {
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
        performedBy: request?.user?._id,
        activityType: EActivityType.CREATED,
        module: EActivitylogModule.CUSTOMIZED_COLUMNS,
        moduleId: response?.data?._id,
        moduleName: response?.data?.name || 'Customize Columns',
      };
      firstValueFrom(
        this.commonFeatures.emit(RMQ_MESSAGES.ACTIVITY_LOG.ACTIVITY_LOG, {
          ...params,
        })
      );
      response.data.activity = true;
    }

    return response;
  }
}
