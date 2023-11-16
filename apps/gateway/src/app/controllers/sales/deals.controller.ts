import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  API_ENDPOINTS,
  API_TAGS,
  CONTROLLERS,
  EExportFile,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';
import {
  CreateDealDto,
  CreateDealResponseDto,
  DealAssociationDto,
  DealAssociationResponseDto,
  // DealNoteDto,
  // DealNotesResponseDto,
  DealTaskDto,
  DealTasksResponseDto,
  DeleteDealsDto,
  DeleteDealsResponseDto,
  GetDealsGridtViewDto,
  GetDealsListViewDto,
  GetDealsListViewResponseDto,
  GetSoftDeletedDealsDto,
  GetSoftDeletedDealsResponseDto,
  IdDto,
  RestoreDealActionDto,
  RestoreDealActionResponseDto,
  UpdateDealDto,
  UpdateDealResponseDto,
} from '@shared/dto';
import { Response } from 'express';
import { firstValueFrom } from 'rxjs';
import { Auth } from '../../decorators/auth.decorator';
import { AppRequest } from '../../shared/interface/request.interface';

@ApiBearerAuth()
@ApiTags(API_TAGS.DEALS)
@Controller(CONTROLLERS.DEALS)
export class DealsController {
  constructor(
    @Inject(SERVICES.SALES)
    private salesService: ClientProxy
  ) {}

  // @Auth(true)
  // @Get(API_ENDPOINTS.SALES.DEAL_VIEWS.GET_NOTES)
  // @ApiOkResponse({ type: DealAssociationResponseDto })
  // public async getNotes(
  //   @Req() request: AppRequest,
  //   @Param() payload: IdDto
  // ): Promise<DealAssociationResponseDto> {
  //   const response = await firstValueFrom(
  //     this.salesService.send(RMQ_MESSAGES.SALES.DEAL_VIEWS.GET_NOTES, payload)
  //   );

  //   return response;
  // }

  @Auth(true)
  @Get(API_ENDPOINTS.SALES.DEAL_VIEWS.GET_TASKS)
  @ApiOkResponse({ type: DealAssociationResponseDto })
  public async getTasks(
    @Req() request: AppRequest,
    @Param() payload: IdDto
  ): Promise<DealAssociationResponseDto> {
    const response = await firstValueFrom(
      this.salesService.send(RMQ_MESSAGES.SALES.DEAL_VIEWS.GET_TASKS, payload)
    );

    return response;
  }

  @Auth(true)
  @Patch(API_ENDPOINTS.SALES.DEALS.CREATE_ASSOCIATION)
  @ApiOkResponse({ type: DealAssociationResponseDto })
  public async associateDeal(
    @Req() request: AppRequest,
    @Body() payload: DealAssociationDto
  ): Promise<DealAssociationResponseDto> {
    const response = await firstValueFrom(
      this.salesService.send(
        RMQ_MESSAGES.SALES.DEALS.CREATE_ASSOCIATION,
        payload
      )
    );
    return response;
  }

  @Auth(true)
  @Patch(API_ENDPOINTS.SALES.DEALS.DELETE_ASSOCIATION)
  @ApiOkResponse({ type: DealAssociationResponseDto })
  public async disassociateDeal(
    @Req() request: AppRequest,
    @Body() payload: DealAssociationDto
  ): Promise<DealAssociationResponseDto> {
    const response = await firstValueFrom(
      this.salesService.send(
        RMQ_MESSAGES.SALES.DEALS.DELETE_ASSOCIATION,
        payload
      )
    );
    return response;
  }

  @Auth(true)
  @Patch(API_ENDPOINTS.SALES.DEALS.ADD_TASK)
  @ApiOkResponse({ type: DealTasksResponseDto })
  public async addTask(
    @Req() request: AppRequest,
    @Body() payload: DealTaskDto
  ): Promise<DealTasksResponseDto> {
    const response = await firstValueFrom(
      this.salesService.send(RMQ_MESSAGES.SALES.DEAL_VIEWS.ADD_TASK, payload)
    );
    return response;
  }
  @Auth(true)
  @Patch(API_ENDPOINTS.SALES.DEALS.DELETE_TASK)
  @ApiOkResponse({ type: DealTasksResponseDto })
  public async deleteTask(
    @Req() request: AppRequest,
    @Body() payload: DealTaskDto
  ): Promise<DealTasksResponseDto> {
    const response = await firstValueFrom(
      this.salesService.send(RMQ_MESSAGES.SALES.DEAL_VIEWS.DELETE_TASK, payload)
    );
    return response;
  }

  // @Auth(true)
  // @Patch(API_ENDPOINTS.SALES.DEALS.ADD_NOTE)
  // @ApiOkResponse({ type: DealNotesResponseDto })
  // public async addNote(
  //   @Req() request: AppRequest,
  //   @Body() payload: DealNoteDto
  // ): Promise<DealNotesResponseDto> {
  //   const response = await firstValueFrom(
  //     this.salesService.send(RMQ_MESSAGES.SALES.DEAL_VIEWS.ADD_NOTE, payload)
  //   );
  //   return response;
  // }
  // @Auth(true)
  // @Patch(API_ENDPOINTS.SALES.DEALS.DELETE_NOTE)
  // @ApiOkResponse({ type: DealNotesResponseDto })
  // public async deleteNote(
  //   @Req() request: AppRequest,
  //   @Body() payload: DealNoteDto
  // ): Promise<DealNotesResponseDto> {
  //   const response = await firstValueFrom(
  //     this.salesService.send(RMQ_MESSAGES.SALES.DEAL_VIEWS.DELETE_NOTE, payload)
  //   );
  //   return response;
  // }

  @Auth(true)
  @Get(API_ENDPOINTS.SALES.DEALS.GET_DEALS_LIST_VIEW)
  @ApiOkResponse({ type: GetDealsListViewResponseDto })
  public async getDealsListVew(
    @Req() request: AppRequest,
    @Query() payload: GetDealsListViewDto,
    @Res() res: Response
  ) {
    payload.userId = request?.user?._id;

    const response = await firstValueFrom(
      this.salesService.send(
        RMQ_MESSAGES.SALES.DEALS.GET_DEALS_LIST_VIEW,
        payload
      )
    );

    // excel response
    if (payload?.downloadType === EExportFile.XLS) {
      const data = Buffer.from(response?.data);

      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      );
      res.setHeader('Content-Disposition', 'attachment; filename="deals.xlsx"');

      return res.send(data);
    }

    // csv response
    if (payload?.downloadType === EExportFile.CSV) {
      const data = Buffer.from(response?.data);

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="deals.csv"');

      return res.send(data);
    }

    // json response
    return res.json(response);
  }

  @Auth(true)
  @Get(API_ENDPOINTS.SALES.DEALS.GET_DEALS_GRID_VIEW)
  @ApiOkResponse({ type: GetDealsListViewResponseDto })
  public async getDealsGridView(
    @Req() request: AppRequest,
    @Query() payload: GetDealsGridtViewDto
  ): Promise<GetDealsListViewResponseDto> {
    payload.userId = request?.user?._id;

    const response = await firstValueFrom(
      this.salesService.send(
        RMQ_MESSAGES.SALES.DEALS.GET_DEALS_GRID_VIEW,
        payload
      )
    );

    return response;
  }

  @Get(API_ENDPOINTS.SALES.DEALS.GET_ASSOCIATIONS)
  @ApiOkResponse({ type: DealAssociationResponseDto })
  public async populateAssociations(
    @Req() request: AppRequest,
    @Param() payload: IdDto
  ): Promise<DealAssociationResponseDto> {
    const response = await firstValueFrom(
      this.salesService.send(RMQ_MESSAGES.SALES.DEALS.GET_ASSOCIATIONS, payload)
    );

    return response;
  }

  @Auth(true)
  @Delete(API_ENDPOINTS.SALES.DEALS.DELTE_DEALS)
  @ApiOkResponse({ type: DeleteDealsResponseDto })
  public async deleteDeals(
    @Req() request: AppRequest,
    @Param() payload: DeleteDealsDto
  ): Promise<DeleteDealsResponseDto> {
    payload.deletedBy = request?.user?._id;

    const response = await firstValueFrom(
      this.salesService.send(RMQ_MESSAGES.SALES.DEALS.DELTE_DEALS, payload)
    );

    return response;
  }

  @Auth(true)
  @Get(API_ENDPOINTS.SALES.DEALS.GET_SOFT_DELETED_DEALS)
  @ApiOkResponse({ type: GetSoftDeletedDealsResponseDto })
  public async getSoftDeletedDeals(
    @Req() request: AppRequest,
    @Query() payload: GetSoftDeletedDealsDto
  ): Promise<GetSoftDeletedDealsResponseDto> {
    payload.deletedBy = request?.user?._id;

    const response = await firstValueFrom(
      this.salesService.send(
        RMQ_MESSAGES.SALES.DEALS.GET_SOFT_DELETED_DEALS,
        payload
      )
    );

    return response;
  }

  @Auth(true)
  @Patch(API_ENDPOINTS.SALES.DEALS.RESTORE_DEAL_ACTION)
  @ApiOkResponse({ type: RestoreDealActionResponseDto })
  public async restoreDealActionRestore(
    @Req() request: AppRequest,
    @Query() payload: RestoreDealActionDto
  ): Promise<RestoreDealActionResponseDto> {
    payload.deletedBy = request?.user?._id;

    const response = await firstValueFrom(
      this.salesService.send(
        RMQ_MESSAGES.SALES.DEALS.RESTORE_DEAL_ACTION,
        payload
      )
    );

    return response;
  }

  @Auth(true)
  @Post(API_ENDPOINTS.SALES.DEALS.CREATE_DEAL)
  @ApiCreatedResponse({ type: CreateDealResponseDto })
  public async createDeal(
    @Req() request: AppRequest,
    @Body() payload: CreateDealDto
  ): Promise<CreateDealResponseDto> {
    payload.createdBy = request?.user?._id;

    const response = await firstValueFrom(
      this.salesService.send(RMQ_MESSAGES.SALES.DEALS.CREATE_DEAL, payload)
    );

    return response;
  }

  @Auth(true)
  @Patch(API_ENDPOINTS.SALES.DEALS.UPDATE_DEAL)
  @ApiOkResponse({ type: UpdateDealResponseDto })
  public async updateDeal(
    @Req() request: AppRequest,
    @Param() params: IdDto,
    @Body() payload: UpdateDealDto
  ): Promise<UpdateDealResponseDto> {
    payload.updatedBy = request?.user?._id;
    payload.id = params.id;

    const response = await firstValueFrom(
      this.salesService.send(RMQ_MESSAGES.SALES.DEALS.UPDATE_DEAL, payload)
    );

    return response;
  }

  @Auth(true)
  @Get(API_ENDPOINTS.SALES.DEALS.DEAL_ACTION_PREVIEW)
  @ApiOkResponse({ type: GetDealsListViewResponseDto })
  public async dealPreview(
    @Query() payload: IdDto
  ): Promise<GetDealsListViewResponseDto> {
    const response = await firstValueFrom(
      this.salesService.send(
        RMQ_MESSAGES.SALES.DEALS.DEAL_ACTION_PREVIEW,
        payload
      )
    );

    return response;
  }
}
