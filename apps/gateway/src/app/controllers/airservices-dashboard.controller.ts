import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Patch,
  Res,
  Delete,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  API_ENDPOINTS,
  API_TAGS,
  CONTROLLERS,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';
import { firstValueFrom } from 'rxjs';
import {
  CreateDashboardtDTO,
  EmailedDashboardDTO,
  EmailedDashboardResponseDTO,
  IdDto,
  ListDashboardDTO,
  CreateAnnouncementDTO,
  FilterTicketDto,
  AnnoucementDashboardResponseDTO,
  DeleteDashboardDto,
  EditDashboardtDTO,
} from '@shared/dto';
import { Auth } from '../decorators/auth.decorator';
@ApiBearerAuth()
@ApiTags(API_TAGS.AIR_SERVICES_DASHBOARD)
@Controller(CONTROLLERS.AIR_SERVICES_DASHBOARD)
export class AirServicesDashboardController {
  constructor(
    @Inject(SERVICES.AIR_SERVICES) private ariServiceClient: ClientProxy
  ) {}

  @Post(API_ENDPOINTS.AIR_SERVICES.DASHBOARD.ADD_DASHBOARD)
  public async createDashboard(@Body() dashboardDTO: CreateDashboardtDTO) {
    try {
      const dashboard = await firstValueFrom(
        this.ariServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.DASHBOARD.CREATE_DASHBOARD,
          dashboardDTO
        )
      );
      return dashboard;
    } catch (err) {
      throw new RpcException(err);
    }
  }

  @Auth(true)
  @ApiOkResponse({ type: EmailedDashboardResponseDTO })
  @Post(API_ENDPOINTS.AIR_SERVICES.DASHBOARD.EMAILED_DASHBOARD)
  public async sendDashboardUrl(
    @Body() dashboardEmailDTO: EmailedDashboardDTO
  ): Promise<EmailedDashboardResponseDTO> {
    try {
      const dashboard = await firstValueFrom(
        this.ariServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.DASHBOARD.EMAILED_DASHBOARD,
          dashboardEmailDTO
        )
      );

      return dashboard;
    } catch (err) {
      throw new RpcException(err);
    }
  }

  @Get(API_ENDPOINTS.AIR_SERVICES.DASHBOARD.GET_DASHBOARDS)
  public async getDashboardList(@Query() listDashboardDTO: ListDashboardDTO) {
    try {
      const dashboardList = await firstValueFrom(
        this.ariServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.DASHBOARD.GET_DASHBOARD_LIST,
          listDashboardDTO
        )
      );
      return dashboardList;
    } catch (err) {
      throw new RpcException(err);
    }
  }
  @Get(API_ENDPOINTS.AIR_SERVICES.DASHBOARD.GET_DASHBOARD_TICKETS)
  public async getDashboardTickets(@Query() payload: FilterTicketDto) {
    try {
      const dashboardtTicketList = await firstValueFrom(
        this.ariServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.DASHBOARD.GET_DASHBOARD_Tickets,
          {
            ...payload,
          }
        )
      );

      return dashboardtTicketList;
    } catch (err) {
      throw new RpcException(err);
    }
  }
  @Get(API_ENDPOINTS.AIR_SERVICES.DASHBOARD.GET_DASHBOARD)
  @ApiParam({
    type: String,
    name: 'id',
    description: 'id should be dashboard id',
  })
  public async getDashboardView(@Param() id: IdDto) {
    try {
      const dashboardList = await firstValueFrom(
        this.ariServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.DASHBOARD.GET_DASHBOARD,
          {
            id,
          }
        )
      );
      return dashboardList;
    } catch (err) {
      throw new RpcException(err);
    }
  }
  @Auth(true)
  @ApiOkResponse({ type: AnnoucementDashboardResponseDTO })
  @Post(API_ENDPOINTS.AIR_SERVICES.DASHBOARD.CREATE_DASHBOARD_ANNOUCEMENT)
  public async createDashboardAnnoucement(
    @Body() dashboardannoucementDTO: CreateAnnouncementDTO
  ): Promise<AnnoucementDashboardResponseDTO> {
    try {
      const dashboardAnnouncement = await firstValueFrom(
        this.ariServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.DASHBOARD.CREATE_DASHBOARD_ANNOUCEMENT,
          dashboardannoucementDTO
        )
      );
      return dashboardAnnouncement;
    } catch (err) {
      throw new RpcException(err);
    }
  }
  @Auth(true)
  @Delete(API_ENDPOINTS.AIR_SERVICES.DASHBOARD.DELETE_DASHBOARD)
  public async deleteDashboard(@Param() payload: DeleteDashboardDto) {
    try {
      const response = await firstValueFrom(
        this.ariServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.DASHBOARD.DELETE_DASHBOARD,
          { ...payload }
        )
      );

      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }
  @Auth(true)
  @Patch(API_ENDPOINTS.AIR_SERVICES.DASHBOARD.UPDATE_DASHBOARD)
  async editDashboard(
    @Param() { id }: IdDto,
    @Body() updateDataDto: EditDashboardtDTO,
    @Res() res: Response | any
  ) {
    try {
      const response = await firstValueFrom(
        this.ariServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.DASHBOARD.UPDATE_DASHBOARD,
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
}
