import { Body, Controller, Inject, Post, Req } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  API_ENDPOINTS,
  API_TAGS,
  CONTROLLERS,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';
import { AddRequesterDto, AddRequesterResponseDTO } from '@shared/dto';
import { firstValueFrom } from 'rxjs';
import { Auth } from '../../../../decorators/auth.decorator';
import { AppRequest } from '../../../../shared/interface/request.interface';

@ApiTags(API_TAGS.REQUESTER)
@Controller(CONTROLLERS.REQUESTER)
@ApiBearerAuth()
export class RequesterController {
  constructor(@Inject(SERVICES.USER) private userServiceClient: ClientProxy) {}

  @Auth(true)
  @ApiOkResponse({ type: AddRequesterResponseDTO })
  @Post(API_ENDPOINTS.AIR_SERVICES.SETTINGS.REQUESTER.ADD)
  public async addRequester(
    @Body() payload: AddRequesterDto,
    @Req() req: AppRequest
  ): Promise<AddRequesterResponseDTO> {
    try {
      payload['createdBy'] = req?.user?._id;
      payload['company'] = req?.user?.companyId;
      const response = await firstValueFrom(
        this.userServiceClient.send(RMQ_MESSAGES.USER.CREATE, payload)
      );

      return response;
    } catch (err) {
      throw new RpcException(err);
    }
  }
}
