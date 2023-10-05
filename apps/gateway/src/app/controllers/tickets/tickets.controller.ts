import { Controller, Inject, Post, Res, Get, Body } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  API_TAGS,
  CONTROLLERS,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';
import { Response } from 'express';
import { firstValueFrom } from 'rxjs';
import { CreateTicketDTO } from '@shared/dto';

@ApiTags(API_TAGS.TICKETS)
@Controller(CONTROLLERS.TICKET)
@ApiBearerAuth()
export class TicketController {
  constructor(
    @Inject(SERVICES.AIR_SERVICES) private ariServiceClient: ClientProxy
  ) {}

  @Post()
  public async createTicket(
    @Body() payload: CreateTicketDTO,
    @Res() res: Response | any
  ) {
    try {
      const response = await firstValueFrom(
        this.ariServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.TICKETS.CREATE_TICKET,
          payload
        )
      );
      return res.status(response.statusCode).json(response);
    } catch (err) {
      return res.status(err.statusCode).json(err);
    }
  }

  @Get(':ticketId')
  public async getTicketDetails(@Res() res: Response | any) {
    try {
      const response = await firstValueFrom(
        this.ariServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.TICKETS.GET_TICKET_DETAILS,
          {}
        )
      );
      return res.status(response.statusCode).json(response);
    } catch (err) {
      return res.status(err.statusCode).json(err);
    }
  }
}
