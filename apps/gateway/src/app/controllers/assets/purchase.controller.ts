import {
  Body,
  Controller,
  Inject,
  Post,
  Res,
  Delete,
  Param,
  Patch,
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
  AddPurchaseDto,
  DeletePurchaseDto,
  UpdatePurchaseDto,
} from '@shared/dto';
import { Response } from 'express';
import { firstValueFrom } from 'rxjs';

@ApiTags(API_TAGS.ASSETS)
@Controller(CONTROLLERS.ASSETS)
export class PurchaseController {
  constructor(
    @Inject(SERVICES.AIR_SERVICES) private airServiceClient: ClientProxy
  ) {}

  @Post(API_ENDPOINTS.AIR_SERVICES.ASSETS.PURCHASE)
  public async addPurchase(
    @Body() payload: AddPurchaseDto,
    @Res() res: Response | any
  ) {
    try {
      const response = await firstValueFrom(
        this.airServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.ASSETS.ADD_PURCHASE,
          payload
        )
      );

      return res.status(response.statusCode).json(response);
    } catch (err) {
      return res.status(err.statusCode).json(err);
    }
  }
  @Delete(API_ENDPOINTS.AIR_SERVICES.ASSETS.DELETE_PURCHASE)
  public async deletePurchase1(
    @Param() payload: DeletePurchaseDto,
    @Res() res: Response | any
  ) {
    try {
      const response = await firstValueFrom(
        this.airServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.ASSETS.DELETE_PURCHASE,
          { ...payload }
        )
      );

      return res.status(response.statusCode).json(response);
    } catch (err) {
      return res.status(err.statusCode).json(err);
    }
  }
  @Patch(API_ENDPOINTS.AIR_SERVICES.ASSETS.UPDATE_PURCHASE)
  public async updateFaq(
    @Body() payload: UpdatePurchaseDto,
    @Res() res: Response | any
  ) {
    try {
      const response = await firstValueFrom(
        this.airServiceClient.send(
          { cmd: RMQ_MESSAGES.AIR_SERVICES.ASSETS.UPDATE_PURCHASE },
          payload
        )
      );

      res.status(response.statusCode).json(response);
    } catch (err) {
      return res.status(err.statusCode).json(err);
    }
  }
}
