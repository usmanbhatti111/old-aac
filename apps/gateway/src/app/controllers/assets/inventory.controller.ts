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
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
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
  GetInventoryAssociateDto,
} from '@shared/dto';
import { Response } from 'express';
import { firstValueFrom } from 'rxjs';
import { DownloadService } from '@shared/services';
@ApiTags(API_TAGS.ASSETS)
@Controller(CONTROLLERS.ASSETS)
export class InventoryController {
  constructor(
    @Inject(SERVICES.AIR_SERVICES) private airServiceClient: ClientProxy,
    private readonly downloadService: DownloadService
  ) {}

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
}
