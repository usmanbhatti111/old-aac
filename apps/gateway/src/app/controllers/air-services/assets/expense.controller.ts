import { Controller, Inject, Post, Res, Body, Get } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import {
  API_ENDPOINTS,
  API_TAGS,
  CONTROLLERS,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';
import { CreateExpenseDTO } from '@shared/dto';
import { Response } from 'express';
import { firstValueFrom } from 'rxjs';
import { Auth } from '../../../decorators/auth.decorator';
@ApiTags(API_TAGS.EXPENSE)
@Controller(CONTROLLERS.EXPENSE)
@ApiBearerAuth()
export class ExpenseController {
  constructor(
    @Inject(SERVICES.AIR_SERVICES) private airServiceClient: ClientProxy
  ) {}

  @Auth(true)
  @Post(API_ENDPOINTS.AIR_SERVICES.EXPENSE.ADD_EXPENSE)
  public async addExpense(
    @Body() payload: CreateExpenseDTO,
    @Res() res: Response | any
  ) {
    try {
      const response = await firstValueFrom(
        this.airServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.EXPENSE.ADD_EXPENSE,
          payload
        )
      );

      return res.status(response.statusCode).json(response);
    } catch (err) {
      return res.status(err.statusCode).json(err);
    }
  }

  @Auth(true)
  @Get(API_ENDPOINTS.AIR_SERVICES.EXPENSE.GET_EXPENSE)
  public async getAssets(@Res() res: Response | any) {
    try {
      const response = await firstValueFrom(
        this.airServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.EXPENSE.GET_EXPENSE,
          {}
        )
      );

      return res.status(response.statusCode).json(response);
    } catch (err) {
      return res.status(err.statusCode).json(err);
    }
  }
}
