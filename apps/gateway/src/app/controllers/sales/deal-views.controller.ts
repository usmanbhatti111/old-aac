import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  API_ENDPOINTS,
  API_TAGS,
  CONTROLLERS,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';
import { Auth } from '../../decorators/auth.decorator';
import { AppRequest } from '../../shared/interface/request.interface';
import { firstValueFrom } from 'rxjs';
import {
  CreateDealViewDto,
  CreateDealViewResponseDto,
  GetDealViewsDto,
  GetDealViewsResponseDto,
} from '@shared/dto';

@ApiBearerAuth()
@ApiTags(API_TAGS.DEAL_VIEWS)
@Controller(CONTROLLERS.DEAL_VIEWS)
export class DealViewsController {
  constructor(
    @Inject(SERVICES.SALES)
    private salesService: ClientProxy
  ) {}

  @Auth(true)
  @Post(API_ENDPOINTS.SALES.DEAL_VIEWS.CREATE_DEAL_VIEW)
  @ApiCreatedResponse({ type: CreateDealViewResponseDto })
  public async createDealView(
    @Req() request: AppRequest,
    @Body() payload: CreateDealViewDto
  ): Promise<CreateDealViewResponseDto> {
    payload.createdBy = request?.user?._id;

    const response = await firstValueFrom(
      this.salesService.send(
        RMQ_MESSAGES.SALES.DEAL_VIEWS.CREATE_DEAL_VIEW,
        payload
      )
    );

    return response;
  }

  @Auth(true)
  @Get(API_ENDPOINTS.SALES.DEAL_VIEWS.GET_DEAL_VIEW)
  @ApiOkResponse({ type: GetDealViewsResponseDto })
  public async getDealsListVew(
    @Req() request: AppRequest,
    @Query() payload: GetDealViewsDto
  ): Promise<GetDealViewsResponseDto> {
    payload.userId = request?.user?._id;

    const response = await firstValueFrom(
      this.salesService.send(
        RMQ_MESSAGES.SALES.DEAL_VIEWS.GET_DEAL_VIEW,
        payload
      )
    );

    return response;
  }
}
