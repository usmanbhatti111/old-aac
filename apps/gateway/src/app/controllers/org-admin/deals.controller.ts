import { Body, Controller, Inject, Post, Req } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import {
  API_ENDPOINTS,
  API_TAGS,
  CONTROLLERS,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';
import { CreateDealDto, CreateDealResponseDto } from '@shared/dto';
import { firstValueFrom } from 'rxjs';
import { Auth } from '../../decorators/auth.decorator';
import { AppRequest } from '../../shared/interface/request.interface';

@ApiBearerAuth()
@ApiTags(API_TAGS.DEALS)
@Controller(CONTROLLERS.DEALS)
export class DealsController {
  constructor(
    @Inject(SERVICES.ORG_ADMIN)
    private orgAdminService: ClientProxy
  ) {}

  @Auth(true)
  @Post(API_ENDPOINTS.ORG_ADMIN.DEALS.CREATE_DEAL)
  @ApiCreatedResponse({ type: CreateDealResponseDto })
  public async addProductCategory(
    @Req() request: AppRequest,
    @Body() payload: CreateDealDto
  ): Promise<CreateDealResponseDto> {
    payload.createdBy = request?.user?._id;

    const response = await firstValueFrom(
      this.orgAdminService.send(
        RMQ_MESSAGES.ORG_ADMIN.DEALS.CREATE_DEAL,
        payload
      )
    );

    return response;
  }
}
