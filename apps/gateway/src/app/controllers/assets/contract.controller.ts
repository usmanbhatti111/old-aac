import {
  Controller,
  Inject,
  Post,
  Body,
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
import { CreateContractDTO, GetContactsDto } from '@shared/dto';
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

  @Get(API_ENDPOINTS.AIR_SERVICES.CONTRACT.GET_CONTRACTS)
  public async getContracts(
    @Query() queryParams: GetContactsDto,
    @Res() res: any
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
