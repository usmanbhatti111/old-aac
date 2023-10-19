import {
  Controller,
  Inject,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  Get,
  Res,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import {
  API_ENDPOINTS,
  API_TAGS,
  CONTROLLERS,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';
import {
  CreateContractDTO,
  DeleteContractDto,
  UpdateContractDTO,
  ExtendRenewContractDTO,
  GetContactsDto,
} from '@shared/dto';
import { DownloadService } from '@shared/services';
import { firstValueFrom } from 'rxjs';

@ApiTags(API_TAGS.CONTRACT)
@Controller(CONTROLLERS.CONTRACT)
export class ContractController {
  constructor(
    @Inject(SERVICES.AIR_SERVICES) private airServiceClient: ClientProxy,
    private readonly downloadService: DownloadService
  ) {}

  @Post(API_ENDPOINTS.AIR_SERVICES.CONTRACT.ADD_CONTRACT)
  public async addContract(@Body() payload: CreateContractDTO) {
    try {
      const response = await firstValueFrom(
        this.airServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.CONTRACT.ADD_CONTRACT,
          payload
        )
      );

      return response;
    } catch (err) {
      throw new RpcException(err);
    }
  }
  @Delete(API_ENDPOINTS.AIR_SERVICES.CONTRACT.DELETE_CONTRACT)
  public async deleteContract(@Param() payload: DeleteContractDto) {
    try {
      const response = await firstValueFrom(
        this.airServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.CONTRACT.DELETE_CONTRACT,
          { ...payload }
        )
      );

      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }
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
