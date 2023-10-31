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
  Put,
  Req,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import {
  ApiCreatedResponse,
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import {
  API_ENDPOINTS,
  API_TAGS,
  CONTROLLERS,
  RMQ_MESSAGES,
  SERVICES,
  EPurchaseOrderStatus,
} from '@shared/constants';
import {
  addPurchaseOrderDto,
  DeletePurchaseOrderDto,
  FilterPurchaseOrderDto,
  GetPurchaseResponseOrderDto,
  UpdatePurchaseOrderDto,
  GetPurchasesResponseOrderDto,
  IdDto,
  FilterPurchaseOrderRecievedDto,
  GetPurchasesAssociationResponseOrderDto,
  DeleteAssociatePurchaseOrderDto,
  AddPurchaseOrderApprover,
  AssociatePurchaseOrderDto,
} from '@shared/dto';
import { DownloadService } from '@shared/services';
import { Auth } from '../../decorators/auth.decorator';
import { firstValueFrom } from 'rxjs';
import { AppRequest } from '../../shared/interface/request.interface';
@ApiTags(API_TAGS.ASSETS)
@Controller(CONTROLLERS.ASSETS)
@ApiBearerAuth()
export class PurchaseOrderController {
  constructor(
    @Inject(SERVICES.AIR_SERVICES) private airServiceClient: ClientProxy,
    private readonly downloadService: DownloadService
  ) {}

  @Auth(true)
  @Post(API_ENDPOINTS.AIR_SERVICES.ASSETS.PURCHASEORDER)
  public async addPurchaseOrder(
    @Body() payload: addPurchaseOrderDto,
    @Req() request: AppRequest
  ) {
    try {
      const { user } = request;

      const organizationId = user?.organization;

      const createdBy = user._id;
      const response = await firstValueFrom(
        this.airServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.ASSETS.ADD_PURCHASEORDER,
          { ...payload, organizationId, createdBy }
        )
      );
      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Auth(true)
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

  @Auth(true)
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

  @Auth(true)
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

  @Auth(true)
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

  @Auth(true)
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

  @Get(API_ENDPOINTS.AIR_SERVICES.ASSETS.GET_PURCHASEORDERASSOCIATE)
  @ApiCreatedResponse({ type: GetPurchasesAssociationResponseOrderDto })
  public async getPurchaseOrderAssociate(
    @Param('id') id: string,
    @Req() request: AppRequest
  ) {
    try {
      const { user } = request;

      const organizationId = user?.organization;

      const createdBy = user?._id;
      const response = await firstValueFrom(
        this.airServiceClient.send(
          { cmd: RMQ_MESSAGES.AIR_SERVICES.ASSETS.GET_PURCHASEORDERASSOCIATE },
          { id, organizationId, createdBy }
        )
      );
      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }
  @Put(API_ENDPOINTS.AIR_SERVICES.ASSETS.CHANGE_PURCHASEORDER_STATUS)
  @ApiOkResponse({ type: UpdatePurchaseOrderDto })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'id should be PurchaseOrder Id',
  })
  @ApiQuery({
    name: 'status',
    enum: EPurchaseOrderStatus,
    required: true,
  })
  public async updateStatusForPurchaseOrder(
    @Res() res: Response | any,
    @Param() id: IdDto,
    @Query('status') status: string
  ): Promise<UpdatePurchaseOrderDto> {
    try {
      const response = await firstValueFrom(
        this.airServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.ASSETS.CHANGE_PURCHASEORDER_STATUS,
          {
            id,
            status,
          }
        )
      );
      return res.status(response.statusCode).json(response);
    } catch (err) {
      throw new RpcException(err);
    }
  }
  @Auth(true)
  @Patch(API_ENDPOINTS.AIR_SERVICES.ASSETS.ADD_APPROVER_ORDER)
  public async addPurchaseOrderApprover(
    @Body() dto: AddPurchaseOrderApprover,
    @Req() request: AppRequest,
    @Req() { user: { _id } }
  ) {
    try {
      const response = await firstValueFrom(
        this.airServiceClient.send(
          { cmd: RMQ_MESSAGES.AIR_SERVICES.ASSETS.ADD_APPROVER_ORDER },
          { dto, userId: _id }
        )
      );
      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }
  @Auth(true)
  @Get(API_ENDPOINTS.AIR_SERVICES.ASSETS.GET_PURCHASEORDER_RECIEVED)
  @ApiCreatedResponse({ type: GetPurchasesResponseOrderDto })
  public async getPurchaseOrderRecived(
    @Query() filterOrder: FilterPurchaseOrderRecievedDto,
    @Req() request: AppRequest
  ) {
    try {
      const { user } = request;

      const organizationId = user?.organization;

      const createdBy = user._id;
      const response = await firstValueFrom(
        this.airServiceClient.send(
          { cmd: RMQ_MESSAGES.AIR_SERVICES.ASSETS.GET_PURCHASEORDER_RECIEVED },
          { ...filterOrder, organizationId, createdBy }
        )
      );
      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
