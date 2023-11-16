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
  UsePipes,
  ValidationPipe,
  Patch,
  Req,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RpcException } from '@nestjs/microservices';
import {
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Auth } from '../../decorators/auth.decorator';
import {
  API_ENDPOINTS,
  API_TAGS,
  CONTROLLERS,
  EActivityType,
  EActivitylogModule,
  RMQ_MESSAGES,
  SERVICES,
  TicketStatusEnum,
} from '@shared/constants';
import { Response } from 'express';
import { firstValueFrom } from 'rxjs';
import {
  AssociateAssetsDTO,
  CreateTicketDTO,
  DetachAssetsDTO,
  GetChildTicketResponse,
  IdDto,
  paginationDTO,
  GetAssociateAssetsDto,
  GetTicketByIdDto,
  CreateTicketResponse,
  EditTicketResponse,
  DeleteTicketResponse,
  ListTicketDTO,
  BulkTicketUpdateDto,
  UpdateManyTicketResponse,
  ActivityLogParams,
} from '@shared/dto';
import { ColumnPipe } from '../../pipes/column.pipe';
import { DownloadService } from '@shared/services';
import { AppRequest } from '../../shared/interface/request.interface';

@ApiTags(API_TAGS.TICKETS)
@Controller(CONTROLLERS.TICKET)
@ApiBearerAuth()
export class TicketController {
  constructor(
    @Inject(SERVICES.AIR_SERVICES) private ariServiceClient: ClientProxy,
    @Inject(SERVICES.COMMON_FEATURE) private commonFeatureClient: ClientProxy,
    private readonly downloadService: DownloadService
  ) {}

  @Auth(true)
  @Post()
  public async createTicket(
    @Body() payload: CreateTicketDTO,
    @Req() request: AppRequest
  ) {
    try {
      const { user } = request;
      const response = await firstValueFrom(
        this.ariServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.TICKETS.CREATE_TICKET,
          payload
        )
      );
      if (response?.data) {
        const params: ActivityLogParams = {
          performedBy: user?._id, // userId
          activityType: EActivityType.CREATED, // UPDATED
          module: EActivitylogModule.TICKETS, // module
          moduleId: response?.data?._id, // module._id
          moduleName: response?.data?.details.name || 'Ticket activity logs', //module.name
        };
        firstValueFrom(
          this.commonFeatureClient.emit(
            RMQ_MESSAGES.ACTIVITY_LOG.ACTIVITY_LOG,
            {
              ...params,
            }
          )
        );
        response.data.activity = true;
      }

      return response;
    } catch (err) {
      throw new RpcException(err);
    }
  }

  @Auth(true)
  @Get(API_ENDPOINTS.AIR_SERVICES.TICKETS.ASSOCIATE_ASSETS)
  public async getAssociateAssets(@Query() queryParams: GetAssociateAssetsDto) {
    try {
      const response = await firstValueFrom(
        this.ariServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.TICKETS.GET_ASSOCIATE_ASSETS,
          queryParams
        )
      );
      return response;
    } catch (err) {
      throw new RpcException(err);
    }
  }

  @Auth(true)
  @Get(':ticketId')
  public async getTicketDetails(@Param() params: GetTicketByIdDto) {
    try {
      const response = await firstValueFrom(
        this.ariServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.TICKETS.GET_TICKET_DETAILS,
          params
        )
      );
      return response;
    } catch (err) {
      throw new RpcException(err);
    }
  }

  @Auth(true)
  @Delete()
  @ApiOkResponse({ type: DeleteTicketResponse })
  public async deleteTickets(
    @Res() res: Response | any,
    @Query('ids') ids: string[]
  ) {
    try {
      const response = await firstValueFrom(
        this.ariServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.TICKETS.DELETE_TICKETS,
          ids
        )
      );
      return res.status(response.statusCode).json(response);
    } catch (err) {
      throw new RpcException(err);
    }
  }

  @Auth(true)
  @Post(API_ENDPOINTS.AIR_SERVICES.TICKETS.ASSOCIATE_ASSETS)
  public async associateAssets(@Body() payload: AssociateAssetsDTO) {
    try {
      const response = await firstValueFrom(
        this.ariServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.TICKETS.ASSOCIATE_ASSETS,
          payload
        )
      );
      return response;
    } catch (err) {
      throw new RpcException(err);
    }
  }

  @Auth(true)
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

  @Auth(true)
  @Post(API_ENDPOINTS.AIR_SERVICES.TICKETS.ADD_CHILD_TICKET)
  @ApiOkResponse({ type: CreateTicketResponse })
  @ApiQuery({
    type: String,
    name: 'id',
    description: 'id should be ticketId',
  })
  public async createChildTicket(
    @Query() id: IdDto,
    @Body() dto: CreateTicketDTO,
    @Res() res: Response | any
  ): Promise<CreateTicketResponse> {
    try {
      const response = await firstValueFrom(
        this.ariServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.TICKETS.CREATE_CHILD_TICKET,
          {
            ...dto,
            ticketId: id,
          }
        )
      );
      return res.status(response.statusCode).json(response);
    } catch (err) {
      throw new RpcException(err);
    }
  }

  @Auth(true)
  @Get(API_ENDPOINTS.AIR_SERVICES.TICKETS.GET_CHILD_TICKETS)
  @ApiOkResponse({ type: GetChildTicketResponse })
  public async getChildTicket(
    @Res() res: Response | any,
    @Param() id: IdDto,
    @Query() pagination: paginationDTO
  ): Promise<GetChildTicketResponse> {
    try {
      const response = await firstValueFrom(
        this.ariServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.TICKETS.GET_CHILD_TICKETS,
          { id, pagination }
        )
      );
      return res.status(response.statusCode).json(response);
    } catch (err) {
      throw new RpcException(err);
    }
  }

  @Auth(true)
  @Delete(API_ENDPOINTS.AIR_SERVICES.TICKETS.DELETE_CHILD_TICKETS)
  @ApiOkResponse({ type: DeleteTicketResponse })
  public async deleteChildTicket(
    @Res() res: Response | any,
    @Query('ids') ids: string[]
  ): Promise<DeleteTicketResponse> {
    try {
      const response = await firstValueFrom(
        this.ariServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.TICKETS.DELETE_CHILD_TICKETS,
          {
            ids,
          }
        )
      );
      return res.status(response.statusCode).json(response);
    } catch (err) {
      throw new RpcException(err);
    }
  }

  @Auth(true)
  @Put(API_ENDPOINTS.AIR_SERVICES.TICKETS.CHANGE_STATUS)
  @ApiOkResponse({ type: EditTicketResponse })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'id should be ticket Id',
  })
  @ApiQuery({
    name: 'status',
    enum: TicketStatusEnum,
    required: true,
  })
  public async updateStatusForTicket(
    @Res() res: Response | any,
    @Param() id: IdDto,
    @Query('status') status: string
  ): Promise<EditTicketResponse> {
    try {
      const response = await firstValueFrom(
        this.ariServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.TICKETS.CHANGE_STATUS,
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
  @Put(':id')
  @ApiOkResponse({ type: EditTicketResponse })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'id should be childTicketId or ticket Id',
  })
  public async editTicket(
    @Res() res: Response | any,
    @Param() id: IdDto,
    @Body() dto: CreateTicketDTO
  ): Promise<EditTicketResponse> {
    try {
      const response = await firstValueFrom(
        this.ariServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.TICKETS.EDIT_TICKETS,
          {
            id,
            ...dto,
          }
        )
      );
      return res.status(response.statusCode).json(response);
    } catch (err) {
      throw new RpcException(err);
    }
  }

  @Auth(true)
  @Get()
  @ApiQuery({
    name: 'columnNames',
    example: 'subject',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  public async getTicketList(
    @Query() listTicketDTO: ListTicketDTO,
    @Query('columnNames', ColumnPipe) columnNames: string[],
    @Res() res: Response | any
  ) {
    try {
      const response = await firstValueFrom(
        this.ariServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.TICKETS.GET_TICKET_LIST,
          { listTicketDTO, columnNames }
        )
      );
      if (listTicketDTO.exportType) {
        const data = response?.data?.tickets || [];
        return this.downloadService.downloadFile(
          listTicketDTO.exportType,
          data,
          res
        );
      }
      return res.status(response.statusCode).json(response);
    } catch (err) {
      throw new RpcException(err);
    }
  }

  @Auth(true)
  @Patch(API_ENDPOINTS.AIR_SERVICES.TICKETS.BULK_TICKET_UPDATE)
  @ApiOkResponse({ type: UpdateManyTicketResponse })
  public async bulkTicketUpdate(
    @Res() res: Response | any,
    @Query('ids') ids: string[],
    @Body() dto: BulkTicketUpdateDto
  ): Promise<UpdateManyTicketResponse> {
    try {
      const response = await firstValueFrom(
        this.ariServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.TICKETS.BULK_TICKET_UPDATE,
          { ids, dto }
        )
      );
      return res.status(response.statusCode).json(response);
    } catch (err) {
      throw new RpcException(err);
    }
  }
}
