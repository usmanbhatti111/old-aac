import { Controller, Get, Inject, Query, Req } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  API_ENDPOINTS,
  API_TAGS,
  CONTROLLERS,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';
import {
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
}
