import {
  Controller,
  Inject,
  Req,
  Get,
  Query,
  Post,
  Body,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ApiTags, ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import {
  API_ENDPOINTS,
  API_TAGS,
  CONTROLLERS,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';
import { Auth } from '../../../../decorators/auth.decorator';
import { AppRequest } from '../../../../shared/interface/request.interface';
import { firstValueFrom } from 'rxjs';
import {
  AddVendorRequestDTO,
  AddVendorResponseDto,
  ListVendorsRequestDto,
  ListVendorsResponseDto,
} from '@shared/dto';

@ApiBearerAuth()
@ApiTags(API_TAGS.VENDORS)
@Controller(CONTROLLERS.VENDORS)
export class VendorController {
  constructor(
    @Inject(SERVICES.AIR_SERVICES) private airServiceClient: ClientProxy
  ) {}

  @Auth(true)
  @ApiOkResponse({ type: AddVendorResponseDto })
  @Post(API_ENDPOINTS.AIR_SERVICES.SETTINGS.VENDORS.ADD_VENDORS)
  public async addTask(
    @Body() payload: AddVendorRequestDTO,
    @Req() request: AppRequest
  ): Promise<AddVendorResponseDto> {
    try {
      payload.companyId = request?.user?.companyId;
      const response = await firstValueFrom(
        this.airServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.SETTINGS.VENDORS.ADD_VENDORS,
          payload
        )
      );

      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Auth(true)
  @ApiOkResponse({ type: ListVendorsResponseDto })
  @Get(API_ENDPOINTS.AIR_SERVICES.SETTINGS.VENDORS.GET_VENDORS)
  public async getVendors(
    @Query() payload: ListVendorsRequestDto,
    @Req() request: AppRequest
  ): Promise<ListVendorsResponseDto> {
    try {
      payload['companyId'] = request?.user?.companyId;

      const response = await firstValueFrom(
        this.airServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.SETTINGS.VENDORS.GET_VENDORS,
          payload
        )
      );

      return response;
    } catch (err) {
      throw new RpcException(err);
    }
  }
}
