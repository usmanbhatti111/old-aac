import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  API_ENDPOINTS,
  API_TAGS,
  CONTROLLERS,
  EActivityType,
  EActivitylogModule,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';
import {
  ActivityLogParams,
  ChangeCompanyOwnerDto,
  ChangeCompanyOwnerResponseDto,
  CreateComapanyDTO,
  CreateCompanyCustomizeColumnDto,
  CreateCompanyCustomizeColumnResponseDto,
  DeleteCompaniesDto,
  DeleteCompaniesResponseDto,
  GetComapaniesResponseDTO,
  GetComapanyDto,
  GetComapanyResponseDTO,
  GetCompanyCustomizedColumns,
  GetCompanyDetailsDto,
  GetCompanyDetailsResponseDto,
  GetCustomizedCompanyColumnsResponseDto,
  GetDeletedCompanisDto,
  GetUniqueCompaniesOwnersDto,
  UpdateComapanyDto,
} from '@shared/dto';
import { firstValueFrom } from 'rxjs';
import { Auth } from '../../decorators/auth.decorator';
import { AppRequest } from '../../shared/interface/request.interface';

@ApiBearerAuth()
@ApiTags(API_TAGS.COMPANIES)
@Controller(CONTROLLERS.COMPANIES)
export class CompaniesController {
  constructor(
    @Inject(SERVICES.COMMON_FEATURE) private commonFeatureClient: ClientProxy
  ) {}

  @Auth(true)
  @Delete(API_ENDPOINTS.COMMON_FEATURES.COMPANIES.DELETE_COMPANIES)
  @ApiOkResponse({ type: DeleteCompaniesResponseDto })
  public async deleteProductFeature(
    @Req() request: AppRequest,
    @Param() payload: DeleteCompaniesDto
  ): Promise<DeleteCompaniesResponseDto> {
    payload.deletedById = request?.user?._id;

    const response = await firstValueFrom(
      this.commonFeatureClient.send(
        RMQ_MESSAGES.COMMON_FEATURES.COMPANIES.DELETE_COMPANIES,
        payload
      )
    );

    //Activity Log
    if (response?.data) {
      const params: ActivityLogParams = {
        performedBy: request?.user?._id,
        activityType: EActivityType.DELETED,
        module: EActivitylogModule.COMPANY,
        moduleId: response?.data?._id,
        moduleName: response?.data?.name || 'Companies',
      };
      firstValueFrom(
        this.commonFeatureClient.send(RMQ_MESSAGES.ACTIVITY_LOG.ACTIVITY_LOG, {
          ...params,
        })
      );
      response.data.activity = true;
    }

    return response;
  }

  @Auth(true)
  @Get(API_ENDPOINTS.COMMON_FEATURES.COMPANIES.GET_UNIQUE_COMPANIES_OWNERS)
  @ApiOkResponse({ type: GetUniqueCompaniesOwnersDto })
  public async getUniqueCompaniesOwners(): Promise<GetUniqueCompaniesOwnersDto> {
    const response = await firstValueFrom(
      this.commonFeatureClient.send(
        RMQ_MESSAGES.COMMON_FEATURES.COMPANIES.GET_UNIQUE_COMPANIES_OWNERS,
        {}
      )
    );

    return response;
  }

  @Auth(true)
  @Put(API_ENDPOINTS.COMMON_FEATURES.COMPANIES.CHANGE_COMPANY_OWNER)
  @ApiOkResponse({ type: ChangeCompanyOwnerResponseDto })
  public async editJobApplication(
    @Req() request: AppRequest,
    @Body() payload: ChangeCompanyOwnerDto
  ): Promise<ChangeCompanyOwnerResponseDto> {
    payload.updatedBy = request?.user?._id;

    const response = await firstValueFrom(
      this.commonFeatureClient.send(
        RMQ_MESSAGES.COMMON_FEATURES.COMPANIES.CHANGE_COMPANY_OWNER,
        payload
      )
    );

    //Activity Log
    if (response?.data) {
      const params: ActivityLogParams = {
        performedBy: request?.user?._id,
        activityType: EActivityType.UPDATED,
        module: EActivitylogModule.COMPANY,
        moduleId: response?.data?._id,
        moduleName: response?.data?.name || 'Companies',
      };
      firstValueFrom(
        this.commonFeatureClient.send(RMQ_MESSAGES.ACTIVITY_LOG.ACTIVITY_LOG, {
          ...params,
        })
      );
      response.data.activity = true;
    }

    return response;
  }

  @Auth(true)
  @Get(API_ENDPOINTS.COMMON_FEATURES.COMPANIES.GET_COMPANY_DETIALS)
  @ApiOkResponse({ type: GetCompanyDetailsResponseDto })
  public async getCompanyDetails(
    @Param() payload: GetCompanyDetailsDto
  ): Promise<GetCompanyDetailsResponseDto> {
    const response = await firstValueFrom(
      this.commonFeatureClient.send(
        RMQ_MESSAGES.COMMON_FEATURES.COMPANIES.GET_COMPANY_DETIALS,
        payload
      )
    );

    return response;
  }

  // nome

  @Auth(true)
  @Post(API_ENDPOINTS.COMPANY.CREATE)
  @ApiOkResponse({ type: GetComapanyResponseDTO })
  public async addMarketingCompany(
    @Req() req: AppRequest,
    @Body() payload: CreateComapanyDTO
  ): Promise<GetComapanyResponseDTO> {
    payload.createdBy = req?.user?._id;
    const response = await firstValueFrom(
      this.commonFeatureClient.send(RMQ_MESSAGES.COMPANY.CREATE, payload)
    );

    //ActivityLog
    if (response?.data) {
      const params: ActivityLogParams = {
        performedBy: req?.user?._id, // userId
        activityType: EActivityType.CREATED, // UPDATED
        module: EActivitylogModule.MARKETING_COMPANY, // module
        moduleId: response?.data?._id, // module._id
        moduleName: response?.data?.name || 'Subscription', //module.name
      };

      firstValueFrom(
        this.commonFeatureClient.emit(
          RMQ_MESSAGES.ACTIVITY_LOG.ACTIVITY_LOG,
          params
        )
      );
      response.data.activity = true;
    }

    return response;
  }

  @Auth(true)
  @Get(API_ENDPOINTS.COMPANY.GET)
  @ApiOkResponse({ type: GetComapaniesResponseDTO })
  public async getMarketingCompanies(
    @Req() req: AppRequest,
    @Query() payload: GetComapanyDto
  ): Promise<GetComapaniesResponseDTO> {
    const response = await firstValueFrom(
      this.commonFeatureClient.send(RMQ_MESSAGES.COMPANY.GET, payload)
    );

    //ActivityLog
    if (response.data) {
      const params: ActivityLogParams = {
        performedBy: req?.user?._id,
        activityType: EActivityType.RETRIEVE,
        module: EActivitylogModule.MARKETING_COMPANY,
        moduleId: response?.data[0]?._id,
        moduleName: response?.data[0]?.name || 'Subscription',
      };

      firstValueFrom(
        this.commonFeatureClient.emit(
          RMQ_MESSAGES.ACTIVITY_LOG.ACTIVITY_LOG,
          params
        )
      );

      response.data.activity = true;
    }

    return response;
  }

  @Auth(true)
  @Get(API_ENDPOINTS.COMPANY.DETAIL)
  public async marketingCompanyDetail(
    @Req() req: AppRequest,
    @Param('id') id: string
  ) {
    const response = await firstValueFrom(
      this.commonFeatureClient.send(RMQ_MESSAGES.COMPANY.DETAIL, id)
    );

    //ActivityLog
    if (response?.data) {
      const params: ActivityLogParams = {
        performedBy: req?.user?._id,
        activityType: EActivityType.RETRIEVE,
        module: EActivitylogModule.MARKETING_COMPANY,
        moduleId: response?.data?._id,
        moduleName: response?.data?.name || 'Subscription',
      };

      firstValueFrom(
        this.commonFeatureClient.emit(
          RMQ_MESSAGES.ACTIVITY_LOG.ACTIVITY_LOG,
          params
        )
      );
      response.data.activity = true;
    }

    return response;
  }

  @Auth(true)
  @Patch(API_ENDPOINTS.COMPANY.UPDATE)
  @ApiOkResponse({ type: GetComapanyResponseDTO })
  public async updateMarketingCompany(
    @Req() req: AppRequest,
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateComapanyDto
  ): Promise<GetComapanyResponseDTO> {
    updateTaskDto.updatedBy = req?.user?._id;
    const response = await firstValueFrom(
      this.commonFeatureClient.send(RMQ_MESSAGES.COMPANY.UPDATE, {
        id,
        data: updateTaskDto,
      })
    );

    //ActivityLog
    if (response?.data) {
      const params: ActivityLogParams = {
        performedBy: req?.user?._id,
        activityType: EActivityType.UPDATED,
        module: EActivitylogModule.MARKETING_COMPANY,
        moduleId: response?.data?._id,
        moduleName: response?.data?.name || 'Subscription',
      };

      firstValueFrom(
        this.commonFeatureClient.emit(
          RMQ_MESSAGES.ACTIVITY_LOG.ACTIVITY_LOG,
          params
        )
      );
      response.data.activity = true;
    }

    return response;
  }

  @Auth(true)
  @Delete(API_ENDPOINTS.COMPANY.DELETE)
  @ApiOkResponse({ type: GetComapanyResponseDTO })
  public async deleteMarketingCompany(
    @Req() req: AppRequest,
    @Query('ids') ids: string[]
  ): Promise<GetComapanyResponseDTO> {
    const response = await firstValueFrom(
      this.commonFeatureClient.send(RMQ_MESSAGES.COMPANY.DELETE, {
        ids,
        deletedById: req?.user?._id,
      })
    );

    //ActivityLog
    if (response?.data) {
      const params: ActivityLogParams = {
        performedBy: req?.user?._id,
        activityType: EActivityType.DELETED,
        module: EActivitylogModule.MARKETING_COMPANY,
        moduleId: response?.data?._id,
        moduleName: response?.data?.name || 'Subscription',
      };

      firstValueFrom(
        this.commonFeatureClient.emit(
          RMQ_MESSAGES.ACTIVITY_LOG.ACTIVITY_LOG,
          params
        )
      );
      response.data.activity = true;
    }

    return response;
  }

  @Auth(true)
  @Get(API_ENDPOINTS.COMPANY.GET_DELETED)
  @ApiOkResponse({ type: GetComapaniesResponseDTO })
  public async getDeletedCompanies(
    @Req() req: AppRequest,
    @Query() payload: GetDeletedCompanisDto
  ): Promise<GetComapaniesResponseDTO> {
    const response = await firstValueFrom(
      this.commonFeatureClient.send(RMQ_MESSAGES.COMPANY.GET_DELETED, payload)
    );

    //ActivityLog
    if (response.data) {
      const params: ActivityLogParams = {
        performedBy: req?.user?._id,
        activityType: EActivityType.RETRIEVE,
        module: EActivitylogModule.MARKETING_COMPANY,
        moduleId: response?.data[0]?._id,
        moduleName: response?.data[0]?.name || 'Subscription',
      };

      firstValueFrom(
        this.commonFeatureClient.emit(
          RMQ_MESSAGES.ACTIVITY_LOG.ACTIVITY_LOG,
          params
        )
      );

      response.data.activity = true;
    }

    return response;
  }

  @Auth(true)
  @Patch(API_ENDPOINTS.COMPANY.CUSTOMIZE_COLUMN)
  @ApiOkResponse({ type: CreateCompanyCustomizeColumnResponseDto })
  public async createOrUpdateCustomizeColumn(
    @Req() request: AppRequest,
    @Body() payload: CreateCompanyCustomizeColumnDto
  ): Promise<CreateCompanyCustomizeColumnResponseDto> {
    if (payload?.userId === request?.user?._id) {
      payload.userId = request?.user?._id;
    } else {
      delete payload?.userId;
    }

    const response = await firstValueFrom(
      this.commonFeatureClient.send(
        RMQ_MESSAGES.COMPANY.CREATE_CUSTOMIZE_COLUMN,
        payload
      )
    );

    //ActivityLog
    if (response?.data) {
      const params: ActivityLogParams = {
        performedBy: request?.user?._id,
        activityType: EActivityType.CREATED,
        module: EActivitylogModule.CUSTOMIZED_COLUMNS,
        moduleId: response?.data?._id,
        moduleName: response?.data?.name || 'Customize Columns',
      };
      firstValueFrom(
        this.commonFeatureClient.emit(RMQ_MESSAGES.ACTIVITY_LOG.ACTIVITY_LOG, {
          ...params,
        })
      );
      response.data.activity = true;
    }

    return response;
  }

  @Auth(true)
  @Get(API_ENDPOINTS.COMPANY.CUSTOMIZE_COLUMN)
  @ApiOkResponse({ type: GetCustomizedCompanyColumnsResponseDto })
  public async getCustomizedColumns(
    @Req() request: AppRequest,
    @Query() payload: GetCompanyCustomizedColumns
  ): Promise<GetCustomizedCompanyColumnsResponseDto> {
    payload.userId = request?.user?._id;

    const response = await firstValueFrom(
      this.commonFeatureClient.send(
        RMQ_MESSAGES.COMPANY.GET_CUSTOMIZE_COLUMN,
        payload
      )
    );

    return response;
  }
}
