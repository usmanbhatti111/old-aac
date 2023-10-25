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
  AssetsSoftwareAssignDto,
  AssetsSoftwareDeviceDto,
  AssetsSoftwareDto,
  CreateAssetsSoftwareResponse,
  DeleteAssetsSoftwareResponse,
  EditAssetsSoftwareResponse,
  GetAssetsSoftwareDetails,
  IdDto,
  PaginationDto,
} from '@shared/dto';
import { firstValueFrom } from 'rxjs';
import { Auth } from '../../decorators/auth.decorator';
@ApiTags(API_TAGS.ASSETS)
@Controller(CONTROLLERS.ASSETS)
@ApiBearerAuth()
export class SoftwareController {
  constructor(
    @Inject(SERVICES.AIR_SERVICES) private airServiceClient: ClientProxy
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
}
