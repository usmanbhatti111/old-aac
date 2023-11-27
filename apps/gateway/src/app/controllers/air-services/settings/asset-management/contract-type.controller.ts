import { Controller, Inject, Req, Get, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import {
  API_TAGS,
  CONTROLLERS,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';
import { Auth } from '../../../../decorators/auth.decorator';
import { AppRequest } from '../../../../shared/interface/request.interface';
import { firstValueFrom } from 'rxjs';
@ApiBearerAuth()
@ApiTags(API_TAGS.CONTRACT_TYPE)
@Controller(CONTROLLERS.CONTRACT_TYPE)
export class ContractTypeController {
  constructor(
    @Inject(SERVICES.AIR_SERVICES) private airServiceClient: ClientProxy
  ) {}

  @Auth(true)
  @Get()
  //   @ApiOkResponse({ type: GetArticlesResponseDto })
  public async getContractTypes(
    @Query() queryParams: any,
    @Req() req: AppRequest
  ): Promise<any> {
    try {
      queryParams.organizationId = req?.user?.organization;
      const response = await firstValueFrom(
        this.airServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.CONTRACT_TYPE.GET,
          queryParams
        )
      );

      return response;
    } catch (err) {
      throw new RpcException(err);
    }
  }
}
