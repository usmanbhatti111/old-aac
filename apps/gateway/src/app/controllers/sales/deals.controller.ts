import {
  BadRequestException,
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
import { DownloadService } from '@shared/services';
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
    private orgAdminService: ClientProxy,
    private readonly downloadService: DownloadService
  ) {}

  @Auth(true)
  @Patch(API_ENDPOINTS.SALES.DEALS.CREATE_ASSOCIATION)
  @ApiOkResponse({ type: DealAssociationResponseDto })
  public async associateDeal(
    @Req() request: AppRequest,
    @Body() payload: DealAssociationDto
  ): Promise<DealAssociationResponseDto> {
    const response = await firstValueFrom(
      this.orgAdminService.send(
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
      this.orgAdminService.send(
        RMQ_MESSAGES.SALES.DEALS.DELETE_ASSOCIATION,
        payload
      )
    );
    return response;
  }

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
      this.orgAdminService.send(
        RMQ_MESSAGES.SALES.DEALS.GET_DEALS_LIST_VIEW,
        payload
      )
    );

    // json response
    if (!payload?.downloadType) return res.json(response);

    // excel response
    if (payload?.downloadType === EExportFile.XLS) {
      const xlsxBuffer = await this.downloadService.convertToXlsx(
        response?.data
      );

      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      );
      res.setHeader('Content-Disposition', 'attachment; filename="deals.xlsx"');

      return res.send(xlsxBuffer);
    }

    // csv response
    if (payload?.downloadType === EExportFile.CSV) {
      const csvStream = this.downloadService.convertToCsv(response?.data);

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="deals.csv"');

      return csvStream.pipe(res);
    }

    throw new BadRequestException('Invaid download format');
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
      this.orgAdminService.send(
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
      this.orgAdminService.send(
        RMQ_MESSAGES.SALES.DEALS.GET_ASSOCIATIONS,
        payload
      )
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
      this.orgAdminService.send(RMQ_MESSAGES.SALES.DEALS.DELTE_DEALS, payload)
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
      this.orgAdminService.send(
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
      this.orgAdminService.send(
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
      this.orgAdminService.send(RMQ_MESSAGES.SALES.DEALS.CREATE_DEAL, payload)
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
      this.orgAdminService.send(RMQ_MESSAGES.SALES.DEALS.UPDATE_DEAL, payload)
    );

    return response;
  }
}
