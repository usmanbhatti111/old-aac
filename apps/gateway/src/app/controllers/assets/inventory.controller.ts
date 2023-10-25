import {
  Body,
  Controller,
  Get,
  Delete,
  Inject,
  Post,
  Res,
  Query,
  Patch,
  Param,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import {
  API_ENDPOINTS,
  API_TAGS,
  CONTROLLERS,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';
import {
  AddInventoryDto,
  SearchInventoryDto,
  EditInventoryDto,
  GetInventoryDto,
  IdDto,
  PaginationDto,
  InventorySoftwareResponse,
  GetInventoryAssociateDto,
} from '@shared/dto';
import { Response } from 'express';
import { firstValueFrom } from 'rxjs';
import { DownloadService } from '@shared/services';
import { Auth } from '../../decorators/auth.decorator';
@ApiTags(API_TAGS.ASSETS)
@Controller(CONTROLLERS.ASSETS)
@ApiBearerAuth()
export class InventoryController {
  constructor(
    @Inject(SERVICES.AIR_SERVICES) private airServiceClient: ClientProxy,
    private readonly downloadService: DownloadService
  ) {}

  @Auth(true)
  @Post(API_ENDPOINTS.AIR_SERVICES.ASSETS.INVENTORY)
  public async addInventory(
    @Body() payload: AddInventoryDto,
    @Res() res: Response | any
  ) {
    try {
      const response = await firstValueFrom(
        this.airServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.ASSETS.ADD_Inventory,
          payload
        )
      );

      return res.status(response.statusCode).json(response);
    } catch (err) {
      return res.status(err.statusCode).json(err);
    }
  }

  @Auth(true)
  @Get(API_ENDPOINTS.AIR_SERVICES.ASSETS.SEARCH_INVENTORY)
  public async searchInventory(
    @Query() payload: SearchInventoryDto,
    @Res() res: Response | any
  ) {
    try {
      const response = await firstValueFrom(
        this.airServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.ASSETS.SEARCH_INVENTORY,
          { ...payload }
        )
      );

      return res.status(response.statusCode).json(response);
    } catch (err) {
      return res.status(err.statusCode).json(err);
    }
  }

  @Auth(true)
  @Patch(API_ENDPOINTS.AIR_SERVICES.ASSETS.EDIT_INVENTORY)
  async editInventory(
    @Param() { id }: IdDto,
    @Body() updateDataDto: EditInventoryDto,
    @Res() res: Response | any
  ) {
    try {
      const response = await firstValueFrom(
        this.airServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.ASSETS.EDIT_Inventory,
          {
            id,
            updateDataDto,
          }
        )
      );
      return res.status(response.statusCode).json(response);
    } catch (error) {
      return res.status(error.statusCode).json(error);
    }
  }

  @Auth(true)
  @Get(API_ENDPOINTS.AIR_SERVICES.ASSETS.INVENTORY)
  public async getInventory(
    @Query() payload: GetInventoryDto,
    @Res() res: Response | any
  ) {
    try {
      const { exportType } = payload;
      const response = await firstValueFrom(
        this.airServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.ASSETS.GET_Inventory,
          { ...payload }
        )
      );

      if (exportType) {
        const data = response?.data?.inventories || [];

        return this.downloadService.downloadFile(exportType, data, res);
      }
      return res.status(response.statusCode).json(response);
    } catch (err) {
      return res.status(err.statusCode).json(err);
    }
  }

  @Auth(true)
  @Get(API_ENDPOINTS.AIR_SERVICES.ASSETS.ASSOCIATE_INVENTORY_LIST)
  public async getAssociateInventoryList(
    @Query() payload: GetInventoryAssociateDto
  ) {
    try {
      const response = await firstValueFrom(
        this.airServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.ASSETS.ASSOCIATE_INVENTORY_LIST,
          { ...payload }
        )
      );
      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Auth(true)
  @Delete(API_ENDPOINTS.AIR_SERVICES.ASSETS.DELETE_INVENTORY)
  public async deleteInventory(
    @Query('ids') ids: string[],
    @Res() res: Response | any
  ) {
    try {
      const response = await firstValueFrom(
        this.airServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.ASSETS.Delete_Inventory,
          { ids }
        )
      );

      return res.status(response.statusCode).json(response);
    } catch (err) {
      return res.status(err.statusCode).json(err);
    }
  }

  @Auth(true)
  @Get(API_ENDPOINTS.AIR_SERVICES.ASSETS.GET_INVENTORY_SOFTWARE_DETAILS)
  @ApiOkResponse({ type: InventorySoftwareResponse })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'id should be InventoryId',
  })
  public async getInventorySoftwareDetails(
    @Param() id: IdDto,
    @Query() pagination: PaginationDto,
    @Res() res: Response | any
  ): Promise<InventorySoftwareResponse> {
    try {
      const response = await firstValueFrom(
        this.airServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.ASSETS.GET_INVENTORY_SOFTWARE_DETAILS,
          { id, pagination }
        )
      );
      return res.status(response.statusCode).json(response);
    } catch (err) {
      return res.status(err.statusCode).json(err);
    }
  }
}
