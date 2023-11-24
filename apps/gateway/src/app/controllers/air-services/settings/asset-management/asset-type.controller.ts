import { Body, Controller, Inject, Post, Req } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  API_ENDPOINTS,
  API_TAGS,
  CONTROLLERS,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';
import { AddAssetTypeDto } from '@shared/dto';
import { firstValueFrom } from 'rxjs';
import { AppRequest } from '../../../../shared/interface/request.interface';
import { Auth } from '../../../../decorators/auth.decorator';

@ApiTags(API_TAGS.ASSET_TYPE)
@Controller(CONTROLLERS.ASSET_TYPE)
@ApiBearerAuth()
export class AssetTypeController {
  constructor(
    @Inject(SERVICES.AIR_SERVICES) private airServiceClient: ClientProxy
  ) {}

  @Auth(true)
  @Post(API_ENDPOINTS.AIR_SERVICES.SETTINGS.ASSET_TYPE)
  public async addAssetType(
    @Body() dto: AddAssetTypeDto,
    @Req() req: AppRequest
  ) {
    try {
      dto.createdBy = req?.user?._id;
      const response = await firstValueFrom(
        this.airServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.SETTINGS.ASSET_TYPE,
          dto
        )
      );
      return response;
    } catch (err) {
      throw new RpcException(err);
    }
  }

  // @Auth(true)
  // @Get(API_ENDPOINTS.AIR_SERVICES.TASK.GET_TASK)
  // @ApiQuery({
  //   name: 'ticketId',
  //   type: String,
  // })
  // async getTasks(@Query() payload: GetTaskListDto, @Res() res: Response | any) {
  //   try {
  //     const response = await firstValueFrom(
  //       this.airServiceClient.send(
  //         RMQ_MESSAGES.AIR_SERVICES.TASK.GET_TASKS,
  //         payload
  //       )
  //     );

  //     return res.status(response.statusCode).json(response);
  //   } catch (err) {
  //     return res.status(err.statusCode).json(err);
  //   }
  // }
}
