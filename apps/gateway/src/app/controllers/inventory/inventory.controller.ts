import { Body, Controller, Get, Inject, Post, Res } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import {
  API_ENDPOINTS,
  API_TAGS,
  CONTROLLERS,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';
import { AddAssetDto } from '@shared/dto';
import { Response } from 'express';
import { firstValueFrom } from 'rxjs';

@ApiTags(API_TAGS.ASSETS)
@Controller(CONTROLLERS.ASSETS)
// @ApiBearerAuth()
export class InventoryController {
  constructor(
    @Inject(SERVICES.AIR_SERVICES) private airServiceClient: ClientProxy
  ) {}

  @Post(API_ENDPOINTS.AIR_SERVICES.ASSETS.ADD_ASSETS)
  public async addAssets(
    @Body() payload: AddAssetDto,
    @Res() res: Response | any
  ) {
    try {
      const response = await firstValueFrom(
        this.airServiceClient.send(RMQ_MESSAGES.AIR_SERVICES.ASSETS.ADD_ASSETS, payload)
      );

      return res.status(response.statusCode).json(response);
    } catch (err) {
      return res.status(err.statusCode).json(err);
    }
  }
  @Get(API_ENDPOINTS.AIR_SERVICES.ASSETS.GET_ASSETS)
  public async getAssets(@Res() res: Response | any) {
    try {
      const response = await firstValueFrom(
        this.airServiceClient.send(RMQ_MESSAGES.AIR_SERVICES.ASSETS.GET_ASSETS, {})
      );

      return res.status(response.statusCode).json(response);
    } catch (err) {
      return res.status(err.statusCode).json(err);
    }
  }
}
