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
  AttachmentDTO,
  AttachmentGetResponse,
  AttachmentResponse,
  DeleteAttachmentResponse,
  IdDto,
} from '@shared/dto';
import { firstValueFrom } from 'rxjs';

@ApiTags(API_TAGS.ATTACHMENT)
@Controller(CONTROLLERS.ATTACHMENT)
export class AttachmentController {
  constructor(
    @Inject(SERVICES.COMMON_FEATURE) private ariServiceClient: ClientProxy
  ) {}

  @Post(API_ENDPOINTS.ATTACHMENT.ADD_ATTACHMENT)
  @ApiOkResponse({ type: AttachmentResponse })
  @ApiFormData({
    single: true,
    fieldName: 'fileUrl',
    fileTypes: ['pdf', 'jpg', 'png'],
    errorMessage: 'Invalid document file entered.',
  })
  public async addAttachment(
    @Body() dto: AttachmentDTO,
    @UploadedFile() fileUrl: any,
    @Res() res: Response | any
  ): Promise<AttachmentResponse> {
    try {
      const response = await firstValueFrom(
        this.ariServiceClient.send(RMQ_MESSAGES.ATTACHMENT.ADD_ATTACHMENT, {
          dto,
          fileUrl,
        })
      );
      return res.status(response.statusCode).json(response);
    } catch (err) {
      throw new RpcException(err);
    }
  }
  @Get(API_ENDPOINTS.ATTACHMENT.GET_ATTACHMENT)
  @ApiQuery({
    name: 'id',
    description: 'id should recordId',
    type: String,
  })
  @ApiOkResponse({ type: AttachmentGetResponse })
  public async getAttachment(
    @Query() id: IdDto,
    @Res() res: Response | any
  ): Promise<AttachmentGetResponse> {
    try {
      const response = await firstValueFrom(
        this.ariServiceClient.send(RMQ_MESSAGES.ATTACHMENT.GET_ATTACHMENT, id)
      );
      return res.status(response.statusCode).json(response);
    } catch (err) {
      throw new RpcException(err);
    }
  }
  @Delete(API_ENDPOINTS.ATTACHMENT.DELETE_ATTACHMENT)
  @ApiOkResponse({ type: DeleteAttachmentResponse })
  public async deleteAttachment(
    @Query() id: IdDto,
    @Res() res: Response | any
  ): Promise<DeleteAttachmentResponse> {
    try {
      const response = await firstValueFrom(
        this.ariServiceClient.send(
          RMQ_MESSAGES.ATTACHMENT.DELETE_ATTACHMENT,
          id
        )
      );
      return res.status(response.statusCode).json(response);
    } catch (err) {
      throw new RpcException(err);
    }
  }
  @Delete(API_ENDPOINTS.ATTACHMENT.DELETE_ALL_ATTACHMENT)
  @ApiQuery({
    name: 'id',
    description: 'id should recordId',
    type: String,
  })
  @ApiOkResponse({ type: DeleteAttachmentResponse })
  public async deleteAllAttachment(
    @Query() id: IdDto,
    @Res() res: Response | any
  ): Promise<DeleteAttachmentResponse> {
    try {
      const response = await firstValueFrom(
        this.ariServiceClient.send(
          RMQ_MESSAGES.ATTACHMENT.DELETE_ALL_ATTACHMENT,
          id
        )
      );
      return res.status(response.statusCode).json(response);
    } catch (err) {
      throw new RpcException(err);
    }
  }
}
