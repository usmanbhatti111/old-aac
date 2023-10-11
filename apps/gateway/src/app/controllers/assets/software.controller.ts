import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  API_ENDPOINTS,
  API_TAGS,
  CONTROLLERS,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';
import { AssetsSoftwareDto, CreateAssetsSoftwareResponse } from '@shared/dto';
import { firstValueFrom } from 'rxjs';
@ApiTags(API_TAGS.ASSETS)
@Controller(CONTROLLERS.ASSETS)
export class SoftwareController {
  constructor(
    @Inject(SERVICES.AIR_SERVICES) private airServiceClient: ClientProxy
  ) {}

  @Post(API_ENDPOINTS.AIR_SERVICES.ASSETS.ADD_SOFTWARE)
  @ApiOkResponse({ type: CreateAssetsSoftwareResponse })
  async addSoftware(
    @Body() dto: AssetsSoftwareDto,
    @Res() res: Response | any
  ): Promise<CreateAssetsSoftwareResponse> {
    try {
      const response = await firstValueFrom(
        this.airServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.ASSETS.ADD_SOFTWARE,
          dto
        )
      );

      return res.status(response.statusCode).json(response);
    } catch (err) {
      return res.status(err.statusCode).json(err);
    }
  }
}
