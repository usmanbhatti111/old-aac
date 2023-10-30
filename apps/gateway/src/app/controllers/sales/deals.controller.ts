import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
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
import {
  CreateDealDto,
  CreateDealResponseDto,
  DeleteDealsDto,
  GetDealsListViewDto,
  GetDealsListViewResponseDto,
  IdDto,
  UpdateDealDto,
  UpdateDealResponseDto,
} from '@shared/dto';
import { firstValueFrom } from 'rxjs';
import { Auth } from '../../decorators/auth.decorator';
import { AppRequest } from '../../shared/interface/request.interface';

@ApiBearerAuth()
@ApiTags(API_TAGS.DEALS)
@Controller(CONTROLLERS.DEALS)
export class DealsController {
  constructor(
    @Inject(SERVICES.SALES)
    private orgAdminService: ClientProxy
  ) {}

  @Auth(true)
  @Post(API_ENDPOINTS.SALES.DEALS.CREATE_DEAL)
  @ApiCreatedResponse({ type: CreateDealResponseDto })
  public async createDeal(
    @Req() request: AppRequest,
    @Body() payload: CreateDealDto
  ): Promise<CreateDealResponseDto> {
    payload.createdBy = request?.user?._id;

    const response = await firstValueFrom(
      this.orgAdminService.send(RMQ_MESSAGES.SALES.DEALS.CREATE_DEAL, payload)
    );

    return response;
  }

  @Auth(true)
  @Patch(API_ENDPOINTS.SALES.DEALS.UPDATE_DEAL)
  @ApiOkResponse({ type: UpdateDealResponseDto })
  public async updateDeal(
    @Req() request: AppRequest,
    @Param() params: IdDto,
    @Body() payload: UpdateDealDto
  ): Promise<UpdateDealResponseDto> {
    payload.updatedBy = request?.user?._id;
    payload.id = params.id;

    const response = await firstValueFrom(
      this.orgAdminService.send(RMQ_MESSAGES.SALES.DEALS.UPDATE_DEAL, payload)
    );

    return response;
  }

  @Auth(true)
  @Get(API_ENDPOINTS.SALES.DEALS.GET_DEALS_LIST_VIEW)
  @ApiOkResponse({ type: GetDealsListViewResponseDto })
  public async getDealsListVew(
    @Req() request: AppRequest,
    @Query() payload: GetDealsListViewDto
  ): Promise<GetDealsListViewResponseDto> {
    payload.userId = request?.user?._id;

    const response = await firstValueFrom(
      this.orgAdminService.send(
        RMQ_MESSAGES.SALES.DEALS.GET_DEALS_LIST_VIEW,
        payload
      )
    );

    return response;
  }

  @Auth(true)
  @Delete(API_ENDPOINTS.SALES.DEALS.DELTE_DEALS)
  public async deleteNewsAndEvents(
    @Req() request: AppRequest,
    @Param() payload: DeleteDealsDto
  ): Promise<any> {
    payload.deletedBy = request?.user?._id;

    const response = await firstValueFrom(
      this.orgAdminService.send(RMQ_MESSAGES.SALES.DEALS.DELTE_DEALS, payload)
    );

    return response;
  }
}
