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
import { ClientProxy } from '@nestjs/microservices';
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
} from '@shared/dto';
import { Response } from 'express';
import { firstValueFrom } from 'rxjs';

@ApiTags(API_TAGS.ASSETS)
@Controller(CONTROLLERS.ASSETS)
export class InventoryController {
  constructor(
    @Inject(SERVICES.AIR_SERVICES) private airServiceClient: ClientProxy
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
      const response = await firstValueFrom(
        this.airServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.ASSETS.GET_Inventory,
          { ...payload }
        )
      );

      return res.status(response.statusCode).json(response);
    } catch (err) {
      return res.status(err.statusCode).json(err);
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
