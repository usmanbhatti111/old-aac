import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Post,
  Query,
  Res,
  UploadedFile,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApiFormData } from '@shared';
import {
  API_ENDPOINTS,
  API_TAGS,
  CONTROLLERS,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';
import {
  AirAttachmentDTO,
  AttachmentAirGetResponse,
  AttachmentAirResponse,
  DeleteAirAttachmentResponse,
  IdDto,
} from '@shared/dto';
import { firstValueFrom } from 'rxjs';

@ApiTags(API_TAGS.AIR_SERVICE_ATTACHMENT)
@Controller(CONTROLLERS.AIR_SERVICE_ATTACHMENT)
export class AirServiceAttachmentController {
  constructor(
    @Inject(SERVICES.AIR_SERVICES) private ariServiceClient: ClientProxy
  ) {}

  @Post(API_ENDPOINTS.AIR_SERVICES.ATTACHMENT.ADD_ATTACHMENT)
  @ApiOkResponse({ type: AttachmentAirResponse })
  @ApiFormData({
    single: true,
    fieldName: 'fileUrl',
    fileTypes: ['pdf', 'jpg', 'png'],
    errorMessage: 'Invalid document file entered.',
  })
  public async addAttachment(
    @Body() dto: AirAttachmentDTO,
    @UploadedFile() fileUrl: any,
    @Res() res: Response | any
  ): Promise<AttachmentAirResponse> {
    try {
      const response = await firstValueFrom(
        this.ariServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.ATTACHMENT.ADD_ATTACHMENT,
          { dto, fileUrl }
        )
      );
      return res.status(response.statusCode).json(response);
    } catch (err) {
      throw new RpcException(err);
    }
  }
  @Get(API_ENDPOINTS.AIR_SERVICES.ATTACHMENT.GET_ATTACHMENT)
  @ApiQuery({
    name: 'id',
    description: 'id should recordId',
    type: String,
  })
  @ApiOkResponse({ type: AttachmentAirGetResponse })
  public async getAttachment(
    @Query() id: IdDto,
    @Res() res: Response | any
  ): Promise<AttachmentAirResponse> {
    try {
      const response = await firstValueFrom(
        this.ariServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.ATTACHMENT.GET_ATTACHMENT,
          id
        )
      );
      return res.status(response.statusCode).json(response);
    } catch (err) {
      throw new RpcException(err);
    }
  }
  @Delete(API_ENDPOINTS.AIR_SERVICES.ATTACHMENT.DELETE_ATTACHMENT)
  @ApiOkResponse({ type: DeleteAirAttachmentResponse })
  public async deleteAttachment(
    @Query() id: IdDto,
    @Res() res: Response | any
  ): Promise<DeleteAirAttachmentResponse> {
    try {
      const response = await firstValueFrom(
        this.ariServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.ATTACHMENT.DELETE_ATTACHMENT,
          id
        )
      );
      return res.status(response.statusCode).json(response);
    } catch (err) {
      throw new RpcException(err);
    }
  }
  @Delete(API_ENDPOINTS.AIR_SERVICES.ATTACHMENT.DELETE_ALL_ATTACHMENT)
  @ApiQuery({
    name: 'id',
    description: 'id should recordId',
    type: String,
  })
  @ApiOkResponse({ type: DeleteAirAttachmentResponse })
  public async deleteAllAttachment(
    @Query() id: IdDto,
    @Res() res: Response | any
  ): Promise<DeleteAirAttachmentResponse> {
    try {
      const response = await firstValueFrom(
        this.ariServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.ATTACHMENT.DELETE_ALL_ATTACHMENT,
          id
        )
      );
      return res.status(response.statusCode).json(response);
    } catch (err) {
      throw new RpcException(err);
    }
  }
}
