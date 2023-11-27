import { Body, Controller, Inject, Post, Req } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  API_ENDPOINTS,
  API_TAGS,
  CONTROLLERS,
  EActivityType,
  EActivitylogModule,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';
import {
  ActivityLogParams,
  ImportFileDTO,
  ImportFileResponseDto,
} from '@shared/dto';
import { firstValueFrom } from 'rxjs';
import { Auth } from '../../decorators/auth.decorator';
import { AppRequest } from '../../shared/interface/request.interface';

@ApiTags(API_TAGS.IMPORT_FILE)
@Controller(CONTROLLERS.IMPORT_FILE)
export class ImportFileController {
  constructor(
    @Inject(SERVICES.COMMON_FEATURE)
    private commonFeatureServiceClient: ClientProxy
  ) {}

  @Auth(true)
  @Post(API_ENDPOINTS.IMPORT_FILE.CREATE_IMPORT_FILE)
  @ApiOkResponse({ type: ImportFileResponseDto })
  public async createImportFile(
    @Req() request: AppRequest,
    @Body() payload: ImportFileDTO
  ): Promise<ImportFileResponseDto> {
    try {
      payload.userId = request?.user?._id;
      const response = await firstValueFrom(
        this.commonFeatureServiceClient.send(
          RMQ_MESSAGES.IMPORT_FILE.CREATE_IMPORT_FILE,
          payload
        )
      );
      //Activity Log
      if (response?.data) {
        const params: ActivityLogParams = {
          performedBy: request?.user?._id,
          activityType: EActivityType.CREATED,
          module: EActivitylogModule.FILES,
          moduleId: response?.data?._id,
          moduleName: response?.data?.name || 'ImportFile',
        };
        firstValueFrom(
          this.commonFeatureServiceClient.send(
            RMQ_MESSAGES.ACTIVITY_LOG.ACTIVITY_LOG,
            {
              ...params,
            }
          )
        );
        response.data.activity = true;
      }

      return response;
    } catch (err) {
      throw new RpcException(err);
    }
  }
}
