import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  Patch,
  Req,
  Res,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import {
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import {
  API_ENDPOINTS,
  API_TAGS,
  CONTROLLERS,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';
import {
  AllocateSoftwareContractDto,
  AssetsSoftwareAssignDto,
  AssetsSoftwareDeviceDto,
  AssetsSoftwareDto,
  CreateAssetsSoftwareResponse,
  DeleteAssetsSoftwareResponse,
  EditAssetsSoftwareResponse,
  GetAssetsSoftwareDetails,
  GetSoftwareUserDto,
  IdDto,
  PaginationDto,
  SoftwareContractResponse,
  SoftwareUserRemoveResponse,
  SoftwareUsersDetailsResponse,
  SoftwareUsersDto,
  SoftwareUsersResponse,
} from '@shared/dto';
import { firstValueFrom } from 'rxjs';
import { Auth } from '../../decorators/auth.decorator';
import { DownloadService } from '@shared/services';
@ApiBearerAuth()
@ApiTags(API_TAGS.ASSETS)
@Controller(CONTROLLERS.ASSETS)
@ApiBearerAuth()
export class SoftwareController {
  constructor(
    @Inject(SERVICES.AIR_SERVICES) private airServiceClient: ClientProxy,
    private readonly downloadService: DownloadService
  ) {}

  @Auth(true)
  @Post(API_ENDPOINTS.AIR_SERVICES.ASSETS.ADD_SOFTWARE)
  @ApiOkResponse({ type: CreateAssetsSoftwareResponse })
  async addSoftware(
    @Body() dto: AssetsSoftwareDto
  ): Promise<CreateAssetsSoftwareResponse> {
    try {
      const response = await firstValueFrom(
        this.airServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.ASSETS.ADD_SOFTWARE,
          dto
        )
      );

      return response;
    } catch (err) {
      throw new RpcException(err);
    }
  }

  @Auth(true)
  @Put(API_ENDPOINTS.AIR_SERVICES.ASSETS.EDIT_SOFTWARE)
  @ApiOkResponse({ type: EditAssetsSoftwareResponse })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'id should be Assets softwareId',
  })
  async editSoftware(
    @Body() dto: AssetsSoftwareDto,
    @Param() id: IdDto
  ): Promise<EditAssetsSoftwareResponse> {
    try {
      const response = await firstValueFrom(
        this.airServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.ASSETS.EDIT_SOFTWARE,
          {
            dto,
            id,
          }
        )
      );

      return response;
    } catch (err) {
      throw new RpcException(err);
    }
  }

  @Auth(true)
  @Delete(API_ENDPOINTS.AIR_SERVICES.ASSETS.DELETE_SOFTWARE)
  @ApiOkResponse({ type: DeleteAssetsSoftwareResponse })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'id should be Assets softwareId',
  })
  async deleteSoftware(
    @Param() id: IdDto
  ): Promise<DeleteAssetsSoftwareResponse> {
    try {
      const response = await firstValueFrom(
        this.airServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.ASSETS.DELETE_SOFTWARE,
          {
            id,
          }
        )
      );
      return response;
    } catch (err) {
      throw new RpcException(err);
    }
  }

  @Auth(true)
  @Get(API_ENDPOINTS.AIR_SERVICES.ASSETS.GET_SOFTWARE)
  @ApiOkResponse({ type: DeleteAssetsSoftwareResponse })
  async getSoftware(
    @Query() dto: GetAssetsSoftwareDetails,
    @Query() pagination: PaginationDto
  ): Promise<DeleteAssetsSoftwareResponse> {
    try {
      const response = await firstValueFrom(
        this.airServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.ASSETS.GET_SOFTWARE,
          {
            dto,
            pagination,
          }
        )
      );
      return response;
    } catch (err) {
      throw new RpcException(err);
    }
  }

  @Auth(true)
  @Patch(API_ENDPOINTS.AIR_SERVICES.ASSETS.ASSIGN_CATEGORY)
  @ApiOkResponse({ type: AssetsSoftwareAssignDto })
  async assignCatToSoftware(
    @Param() { id }: IdDto,
    @Body() category: AssetsSoftwareAssignDto
  ): Promise<AssetsSoftwareAssignDto> {
    try {
      const response = await firstValueFrom(
        this.airServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.ASSETS.ASSIGN_CATEGORY,
          {
            id,
            category,
          }
        )
      );

      return response;
    } catch (err) {
      throw new RpcException(err);
    }
  }

  @Auth(true)
  @Patch(API_ENDPOINTS.AIR_SERVICES.ASSETS.ADD_SOFTWARE_DEVICE)
  async addSoftwareDevice(
    @Param() { id }: IdDto,
    @Body() softwareId: AssetsSoftwareDeviceDto
  ) {
    try {
      const response = await firstValueFrom(
        this.airServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.ASSETS.ADD_SOFTWARE_DEVICE,
          { id, softwareId }
        )
      );
      return response;
    } catch (err) {
      throw new RpcException(err);
    }
  }

  @Auth(true)
  @Patch(API_ENDPOINTS.AIR_SERVICES.ASSETS.DELETE_SOFTWARE_DEVICE)
  async removeSoftwareDevice(
    @Param() { id }: IdDto,
    @Body() softwareId: AssetsSoftwareDeviceDto
  ) {
    try {
      const response = await firstValueFrom(
        this.airServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.ASSETS.DELETE_SOFTWARE_DEVICE,
          {
            id,
            softwareId,
          }
        )
      );
      return response;
    } catch (err) {
      throw new RpcException(err);
    }
  }

  @Post(API_ENDPOINTS.AIR_SERVICES.ASSETS.ADD_SOFTWARE_USERS)
  @Auth(true)
  @ApiOkResponse({ type: SoftwareUsersResponse })
  async addSoftwareUsers(
    @Query() dto: SoftwareUsersDto,
    @Req() { user: { _id } }
  ): Promise<SoftwareUsersResponse> {
    try {
      const response = await firstValueFrom(
        this.airServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.ASSETS.ADD_SOFTWARE_USERS,
          { dto, userId: _id }
        )
      );

      return response;
    } catch (err) {
      throw new RpcException(err);
    }
  }
  @Get(API_ENDPOINTS.AIR_SERVICES.ASSETS.SOFTWARE_USERS_DETAILS)
  @Auth(true)
  @ApiParam({
    type: String,
    name: 'id',
    description: 'id should be Assets softwareId',
  })
  @ApiOkResponse({ type: SoftwareUsersDetailsResponse })
  async getSoftwareUsers(
    @Param() id: IdDto,
    @Req() { user: { _id } },
    @Query() dto: GetSoftwareUserDto,
    @Res() res: Response | any
  ) {
    try {
      const { exportType } = dto;
      const response = await firstValueFrom(
        this.airServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.ASSETS.SOFTWARE_USERS_DETAILS,
          { id, userId: _id, dto }
        )
      );
      if (exportType) {
        const data = response.data.softwareusers || [];
        const file = this.downloadService.downloadFile(exportType, data, res);
        return file;
      }
      return res.status(response.statusCode).json(response);
    } catch (err) {
      throw new RpcException(err);
    }
  }
  @Put(API_ENDPOINTS.AIR_SERVICES.ASSETS.SOFTWARE_ALLOCATE_CONTRACT)
  @Auth(true)
  @ApiOkResponse({ type: SoftwareContractResponse })
  async allocateSoftwareContract(
    @Query() dto: AllocateSoftwareContractDto,
    @Req() { user: { _id } }
  ): Promise<SoftwareContractResponse> {
    try {
      const response = await firstValueFrom(
        this.airServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.ASSETS.SOFTWARE_ALLOCATE_CONTRACT,
          { dto, userId: _id }
        )
      );

      return response;
    } catch (err) {
      throw new RpcException(err);
    }
  }
  @Put(API_ENDPOINTS.AIR_SERVICES.ASSETS.SOFTWARE_DEALLOCATE_CONTRACT)
  @Auth(true)
  @ApiOkResponse({ type: SoftwareContractResponse })
  async deAllocateSoftwareContract(
    @Query() dto: AllocateSoftwareContractDto,
    @Req() { user: { _id } }
  ): Promise<SoftwareContractResponse> {
    try {
      const response = await firstValueFrom(
        this.airServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.ASSETS.SOFTWARE_DEALLOCATE_CONTRACT,
          { dto, userId: _id }
        )
      );

      return response;
    } catch (err) {
      throw new RpcException(err);
    }
  }
  @Auth(true)
  @Delete(API_ENDPOINTS.AIR_SERVICES.ASSETS.SOFTWARE_USERS_REMOVE)
  @ApiOkResponse({ type: SoftwareUserRemoveResponse })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'id should be Assets software Users id',
  })
  async removeSoftwareUser(
    @Param() id: IdDto
  ): Promise<SoftwareUserRemoveResponse> {
    try {
      const response = await firstValueFrom(
        this.airServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.ASSETS.SOFTWARE_USERS_REMOVE,
          {
            id,
          }
        )
      );
      return response;
    } catch (err) {
      throw new RpcException(err);
    }
  }
}
