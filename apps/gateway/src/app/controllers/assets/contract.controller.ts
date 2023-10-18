import { Controller, Inject, Post, Body } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import {
  API_ENDPOINTS,
  API_TAGS,
  CONTROLLERS,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';
import { CreateContractDTO } from '@shared/dto';
import { firstValueFrom } from 'rxjs';

@ApiTags(API_TAGS.CONTRACT)
@Controller(CONTROLLERS.CONTRACT)
export class ContractController {
  constructor(
    @Inject(SERVICES.AIR_SERVICES) private airServiceClient: ClientProxy
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
}
