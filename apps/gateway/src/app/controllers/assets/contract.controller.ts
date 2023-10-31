import {
  Controller,
  Inject,
  Post,
  Body,
  Delete,
  Patch,
  Query,
  Get,
  Res,
  UploadedFile,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import {
  API_ENDPOINTS,
  API_TAGS,
  CONTROLLERS,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';
import {
  CreateContractDTO,
  UpdateContractDTO,
  ExtendRenewContractDTO,
  GetContactsDto,
} from '@shared/dto';
import { DownloadService } from '@shared/services';
import { firstValueFrom } from 'rxjs';
import { Auth } from '../../decorators/auth.decorator';
import { ApiFormData } from '@shared';
@ApiBearerAuth()
@ApiTags(API_TAGS.CONTRACT)
@Controller(CONTROLLERS.CONTRACT)
export class ContractController {
  constructor(
    @Inject(SERVICES.AIR_SERVICES) private airServiceClient: ClientProxy,
    @Inject(SERVICES.COMMON_FEATURE) private commonClient: ClientProxy,
    private readonly downloadService: DownloadService
  ) {}

  @Auth(true)
  @Post(API_ENDPOINTS.AIR_SERVICES.CONTRACT.ADD_CONTRACT)
  @ApiFormData({
    single: true,
    fieldName: 'fileUrl',
    fileTypes: ['pdf', 'jpg', 'png'],
    errorMessage: 'Invalid document file entered.',
  })
  public async addContract(
    @Body() payload: CreateContractDTO,
    @UploadedFile() fileUrl: any
  ) {
    try {
      const response = await firstValueFrom(
        this.airServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.CONTRACT.ADD_CONTRACT,
          payload
        )
      );
      payload.recordId = response.data._id;
      await firstValueFrom(
        this.commonClient.send(RMQ_MESSAGES.ATTACHMENT.ADD_ATTACHMENT, {
          fileUrl,
          dto: payload,
        })
      );

      return { response };
    } catch (err) {
      throw new RpcException(err);
    }
  }

  @Auth(true)
  @Delete(API_ENDPOINTS.AIR_SERVICES.CONTRACT.DELETE_CONTRACT)
  public async deleteContract(@Query('ids') ids: string[]) {
    try {
      const response = await firstValueFrom(
        this.airServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.CONTRACT.DELETE_CONTRACT,
          { ids }
        )
      );

      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Auth(true)
  @Patch(API_ENDPOINTS.AIR_SERVICES.CONTRACT.UPDATE_CONTRACT)
  public async UpdateContract(@Body() payload: UpdateContractDTO) {
    try {
      const response = await firstValueFrom(
        this.airServiceClient.send(
          { cmd: RMQ_MESSAGES.AIR_SERVICES.CONTRACT.UPDATE_CONTRACT },
          payload
        )
      );

      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Auth(true)
  @Patch(API_ENDPOINTS.AIR_SERVICES.CONTRACT.RENEW_EXTEND_CONTRACT)
  public async renewContract(@Body() payload: ExtendRenewContractDTO) {
    try {
      const response = await firstValueFrom(
        this.airServiceClient.send(
          { cmd: RMQ_MESSAGES.AIR_SERVICES.CONTRACT.RENEW_EXTEND_CONTRACT },
          payload
        )
      );

      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Auth(true)
  @Get(API_ENDPOINTS.AIR_SERVICES.CONTRACT.GET_CONTRACTS)
  public async getContracts(
    @Query() queryParams: GetContactsDto,
    @Res() res: Response | any
  ) {
    try {
      const { exportType } = queryParams;
      const response = await firstValueFrom(
        this.airServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.CONTRACT.GET_CONTRACTS,
          queryParams
        )
      );

      if (exportType) {
        const data = response?.data?.result || [];
        return this.downloadService.downloadFile(exportType, data, res);
      } else return res.status(200).json(response);
    } catch (err) {
      throw new RpcException(err);
    }
  }
}
