import {
  Body,
  Controller,
  Inject,
  Post,
  Req,
  Query,
  Get,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ApiBearerAuth, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import {
  API_ENDPOINTS,
  API_TAGS,
  CONTROLLERS,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';
import {
  AddAssetTypeDto,
  AddAssetTypeResponseDTO,
  ListAssetTypeDto,
} from '@shared/dto';
import { firstValueFrom } from 'rxjs';
import { AppRequest } from '../../../../shared/interface/request.interface';
import { Auth } from '../../../../decorators/auth.decorator';

@ApiTags(API_TAGS.ASSET_TYPE)
@Controller(CONTROLLERS.ASSET_TYPE)
@ApiBearerAuth()
export class AssetTypeController {
  constructor(
    @Inject(SERVICES.AIR_SERVICES) private airServiceClient: ClientProxy
  ) {}

  @Auth(true)
  @ApiOkResponse({ type: AddAssetTypeResponseDTO })
  @Post(API_ENDPOINTS.AIR_SERVICES.SETTINGS.ASSET_TYPE.ASSET_TYPE)
  public async addAssetType(
    @Body() dto: AddAssetTypeDto,
    @Req() req: AppRequest
  ): Promise<AddAssetTypeResponseDTO> {
    try {
      dto.createdBy = req?.user?._id;
      dto.companyId = req?.user?.companyId;
      const response = await firstValueFrom(
        this.airServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.SETTINGS.ASSET_TYPE,
          dto
        )
      );
      return response;
    } catch (err) {
      throw new RpcException(err);
    }
  }
  @Get(API_ENDPOINTS.AIR_SERVICES.SETTINGS.ASSET_TYPE.ASSET_TYPE_LIST)
  public async getAssetTypeList(@Query() listDashboardDTO: ListAssetTypeDto) {
    try {
      const dashboardList = await firstValueFrom(
        this.airServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.SETTINGS.ASSET_TYPE_LIST,
          listDashboardDTO
        )
      );
      return dashboardList;
    } catch (err) {
      throw new RpcException(err);
    }
  }
}
