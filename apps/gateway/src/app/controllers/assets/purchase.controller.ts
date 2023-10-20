import {
  Body,
  Controller,
  Inject,
  Post,
  Delete,
  Param,
  Patch,
  Get,
  Query,
  Res,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import {
  API_ENDPOINTS,
  API_TAGS,
  CONTROLLERS,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';
import {
  addPurchaseOrderDto,
  DeletePurchaseOrderDto,
  FilterPurchaseOrderDto,
  GetPurchaseResponseOrderDto,
  UpdatePurchaseOrderDto,
  GetPurchasesResponseOrderDto,
  IdDto,
  DeleteAssociatePurchaseOrderDto,
  AssociatePurchaseOrderDto,
} from '@shared/dto';
import { DownloadService } from '@shared/services';

import { firstValueFrom } from 'rxjs';

@ApiTags(API_TAGS.ASSETS)
@Controller(CONTROLLERS.ASSETS)
export class PurchaseOrderController {
  constructor(
    @Inject(SERVICES.AIR_SERVICES) private airServiceClient: ClientProxy,
    private readonly downloadService: DownloadService
  ) {}

  @Post(API_ENDPOINTS.AIR_SERVICES.ASSETS.PURCHASEORDER)
  public async addPurchaseOrder(@Body() payload: addPurchaseOrderDto) {
    try {
      const response = await firstValueFrom(
        this.airServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.ASSETS.ADD_PURCHASEORDER,
          payload
        )
      );
      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }
  @Delete(API_ENDPOINTS.AIR_SERVICES.ASSETS.DELETE_PURCHASEORDER)
  public async deletePurchaseOrder(@Param() payload: DeletePurchaseOrderDto) {
    try {
      const response = await firstValueFrom(
        this.airServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.ASSETS.DELETE_PURCHASEORDER,
          { ...payload }
        )
      );

      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }
  @Patch(API_ENDPOINTS.AIR_SERVICES.ASSETS.UPDATE_PURCHASEORDER)
  public async updatePurchaseOrder(@Body() payload: UpdatePurchaseOrderDto) {
    try {
      const response = await firstValueFrom(
        this.airServiceClient.send(
          { cmd: RMQ_MESSAGES.AIR_SERVICES.ASSETS.UPDATE_PURCHASEORDER },
          payload
        )
      );

      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(API_ENDPOINTS.AIR_SERVICES.ASSETS.ADD_ASSOCIATE_ORDER)
  public async addAssociatePurchaseOrder(
    @Param() { id }: IdDto,
    @Body() associatePurchaseOrderDto: AssociatePurchaseOrderDto
  ) {
    try {
      const response = await firstValueFrom(
        this.airServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.ASSETS.ADD_ASSOCIATE_ORDER,
          {
            id,
            ticketsIds: associatePurchaseOrderDto.ticketsIds,
          }
        )
      );

      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(API_ENDPOINTS.AIR_SERVICES.ASSETS.DELETE_ASSOCIATE_ORDER)
  public async dissociatePurchaseOrder(
    @Param() { id }: IdDto,
    @Body() purchaseOrderId: DeleteAssociatePurchaseOrderDto
  ) {
    try {
      const response = await firstValueFrom(
        this.airServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.ASSETS.DELETE_ASSOCIATE_ORDER,
          {
            id,
            purchaseOrderId,
          }
        )
      );

      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get(API_ENDPOINTS.AIR_SERVICES.ASSETS.GET_PURCHASEORDER)
  @ApiCreatedResponse({ type: GetPurchaseResponseOrderDto })
  public async getPurchaseOrder(@Param('id') id: string) {
    try {
      const response = await firstValueFrom(
        this.airServiceClient.send(
          { cmd: RMQ_MESSAGES.AIR_SERVICES.ASSETS.GET_PURCHASEORDER },
          { id }
        )
      );
      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }
  @Get(API_ENDPOINTS.AIR_SERVICES.ASSETS.GET_PURCHASEORDERLIST)
  @ApiCreatedResponse({ type: GetPurchasesResponseOrderDto })
  public async getPurchaseOrderList(
    @Query() filter: FilterPurchaseOrderDto,
    @Res() res: Response | any
  ) {
    try {
      const { exportType } = filter;
      const response = await firstValueFrom(
        this.airServiceClient.send(
          { cmd: RMQ_MESSAGES.AIR_SERVICES.ASSETS.GET_PURCHASEORDERLIST },
          filter
        )
      );
      if (exportType) {
        const data = response?.data?.purchases || [];
       return this.downloadService.downloadFile(exportType, data, res);
      }
      return res.status(response.statusCode).json(response);
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
