import {
  Controller,
  Inject,
  Post,
  Res,
  Get,
  Body,
  Query,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import {
  API_ENDPOINTS,
  API_TAGS,
  CONTROLLERS,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';
import { Response } from 'express';
import { firstValueFrom } from 'rxjs';
import {
  AssociateAssetsDTO,
  CreateChildTicketResponse,
  CreateTicketDTO,
  DeleteChildTicketResponse,
  EditChildTicketResponse,
  GetChildTicketResponse,
  IdDto,
  DetachAssetsDTO,
} from '@shared/dto';

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
  @Post(API_ENDPOINTS.AIR_SERVICES.TICKETS.ASSOCIATE_ASSETS)
  public async associateAssets(
    @Body() payload: AssociateAssetsDTO,
    @Res() res: Response | any
  ) {
    try {
      const response = await firstValueFrom(
        this.ariServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.TICKETS.ASSOCIATE_ASSETS,
          payload
        )
      );
      res.status(response.statusCode).json(response);
    } catch (err) {
      res.status(err.statusCode).json(err);
    }
  }
  @Delete(API_ENDPOINTS.AIR_SERVICES.TICKETS.DETACH_ASSETS)
  public async detachAssets(
    @Query() payload: DetachAssetsDTO,
    @Res() res: Response | any
  ) {
    try {
      const response = await firstValueFrom(
        this.ariServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.TICKETS.DETACH_ASSETS,
          payload
        )
      );
      res.status(response.statusCode).json(response);
    } catch (err) {
      res.status(err.statusCode).json(err);
    }
  }

  @Post(API_ENDPOINTS.AIR_SERVICES.TICKETS.ADD_CHILD_TICKET)
  @ApiOkResponse({ type: CreateChildTicketResponse })
  @ApiQuery({
    type: String,
    name: 'id',
    description: 'id should be ticketId',
  })
  public async createChildTicket(
    @Query() id: IdDto,
    @Body() dto: CreateTicketDTO,
    @Res() res: Response | any
  ): Promise<CreateChildTicketResponse> {
    try {
      const response = await firstValueFrom(
        this.ariServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.TICKETS.CREATE_CHILD_TICKET,
          {
            ...dto,
            id,
          }
        )
      );
      return res.status(response.statusCode).json(response);
    } catch (err) {
      return res.status(err.statusCode).json(err);
    }
  }

  @Get(API_ENDPOINTS.AIR_SERVICES.TICKETS.GET_CHILD_TICKETS)
  @ApiOkResponse({ type: GetChildTicketResponse })
  public async getChildTicket(
    @Res() res: Response | any,
    @Param() id: IdDto
  ): Promise<GetChildTicketResponse> {
    try {
      const response = await firstValueFrom(
        this.ariServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.TICKETS.GET_CHILD_TICKETS,
          id
        )
      );
      return res.status(response.statusCode).json(response);
    } catch (err) {
      return res.status(err.statusCode).json(err);
    }
  }

  @Delete(API_ENDPOINTS.AIR_SERVICES.TICKETS.DELETE_CHILD_TICKETS)
  @ApiOkResponse({ type: DeleteChildTicketResponse })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'id should be childTicketId',
  })
  public async deleteChildTicket(
    @Res() res: Response | any,
    @Param() id: IdDto
  ) {
    try {
      const response = await firstValueFrom(
        this.ariServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.TICKETS.DELETE_CHILD_TICKETS,
          id
        )
      );
      return res.status(response.statusCode).json(response);
    } catch (err) {
      return res.status(err.statusCode).json(err);
    }
  }
  @Put(API_ENDPOINTS.AIR_SERVICES.TICKETS.EDIT_CHILD_TICKETS)
  @ApiOkResponse({ type: EditChildTicketResponse })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'id should be childTicketId',
  })
  public async editChildTicket(
    @Res() res: Response | any,
    @Param() id: IdDto,
    @Body() dto: CreateTicketDTO
  ): Promise<EditChildTicketResponse> {
    try {
      const response = await firstValueFrom(
        this.ariServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.TICKETS.EDIT_CHILD_TICKETS,
          {
            id,
            ...dto,
          }
        )
      );
      return res.status(response.statusCode).json(response);
    } catch (err) {
      return res.status(err.statusCode).json(err);
    }
  }
}
