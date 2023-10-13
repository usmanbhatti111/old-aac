import {
  Body,
  Controller,
  Inject,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  API_ENDPOINTS,
  API_TAGS,
  CONTROLLERS,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';
import {
  AssetsSoftwareAssignDto,
  AssetsSoftwareDto,
  CreateAssetsSoftwareResponse,
  IdDto,
} from '@shared/dto';
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

  @Patch(API_ENDPOINTS.AIR_SERVICES.ASSETS.ASSIGN_CATEGORY)
  @ApiOkResponse({ type: AssetsSoftwareAssignDto })
  async assignCatToSoftware(
    @Param() { id }: IdDto,
    @Body() category: AssetsSoftwareAssignDto,
    @Res() res: Response | any
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

      return res.status(response.statusCode).json(response);
    } catch (err) {
      return res.status(err.statusCode).json(err);
    }
  }
}
