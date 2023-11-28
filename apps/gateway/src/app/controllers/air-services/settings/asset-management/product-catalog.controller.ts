import { Controller, Inject, Req, Body, Post } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ApiTags, ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import {
  API_ENDPOINTS,
  API_TAGS,
  CONTROLLERS,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';

import {
  AddProductCatalogRequestDTO,
  AddProductCatalogResponseDto,
} from '@shared/dto';
import { Auth } from '../../../../decorators/auth.decorator';
import { AppRequest } from '../../../../shared/interface/request.interface';
import { firstValueFrom } from 'rxjs';
@ApiBearerAuth()
@ApiTags(API_TAGS.PRODUCT_CATALOG)
@Controller(CONTROLLERS.PRODUCT_CATALOG)
export class ProductCatalogController {
  constructor(
    @Inject(SERVICES.AIR_SERVICES) private airServiceClient: ClientProxy
  ) {}

  @Auth(true)
  @Post(API_ENDPOINTS.AIR_SERVICES.SETTINGS.PRODUCT_CATALOG.ADD)
  @ApiOkResponse({ type: AddProductCatalogResponseDto })
  public async addProductCatalog(
    @Body() body: AddProductCatalogRequestDTO,
    @Req() req: AppRequest
  ): Promise<AddProductCatalogResponseDto> {
    try {
      body.companyId = req?.user?.companyId;
      body.createdBy = req?.user?._id;
      const response = await firstValueFrom(
        this.airServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.SETTINGS.PRODUCT_CATALOG.ADD,
          body
        )
      );

      return response;
    } catch (err) {
      throw new RpcException(err);
    }
  }
}
