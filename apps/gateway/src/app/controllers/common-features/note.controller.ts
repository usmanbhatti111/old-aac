import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
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
  CreateNoteDto,
  DeleteNoteDto,
  DeleteNoteResponseDto,
  UpdateNoteDto,
  GetNotesDto,
  IdDto,
  GetNoteDto,
  CreateNoteResponseDto,
  GetNoteResponseDto,
  GetNotesResponseDto,
  UpdateNoteResponseDto,
  ActivityLogParams,
} from '@shared/dto';
import { firstValueFrom } from 'rxjs';
import { Auth } from '../../decorators/auth.decorator';
import { AppRequest } from '../../shared/interface/request.interface';
import { ApiFormData } from '@shared';

@ApiBearerAuth()
@ApiTags(API_TAGS.NOTE)
@Controller(CONTROLLERS.NOTE)
export class NoteController {
  constructor(
    @Inject(SERVICES.COMMON_FEATURE)
    private commonFeatureServiceClient: ClientProxy
  ) {}

  @Auth(true)
  @Post(API_ENDPOINTS.COMMON_FEATURES.NOTES.CREATE_NOTE)
  @ApiFormData({
    required: false,
    single: true,
    fieldName: 'file',
    fileTypes: ['jpg', 'png', 'jpeg'],
    errorMessage: 'Invalid document file entered.',
  })
  @ApiCreatedResponse({ type: CreateNoteResponseDto })
  public async addNote(
    @Req() request: AppRequest,
    @Body() payload: CreateNoteDto,
    @UploadedFile() file: any
  ): Promise<CreateNoteResponseDto> {
    payload.createdBy = request?.user?._id;
    payload.file = file;

    const response = await firstValueFrom(
      this.commonFeatureServiceClient.send(
        RMQ_MESSAGES.COMMON_FEATURES.NOTES.CREATE_NOTE,
        payload
      )
    );

    //ActivityLog
    if (response?.data) {
      const params: ActivityLogParams = {
        performedBy: request?.user?._id,
        activityType: EActivityType.CREATED,
        module: EActivitylogModule.NOTES,
        moduleId: response?.data?._id,
        moduleName: response?.data?.title || 'notes',
      };

      firstValueFrom(
        this.commonFeatureServiceClient.emit(
          RMQ_MESSAGES.ACTIVITY_LOG.ACTIVITY_LOG,
          {
            ...params,
          }
        )
      );
      response.data.activity = true;
    }

    return response;
  }

  @Auth(true)
  @Get(API_ENDPOINTS.COMMON_FEATURES.NOTES.GET_NOTES)
  @ApiOkResponse({ type: GetNotesResponseDto })
  public async getNotes(
    @Req() request: AppRequest,
    @Query() payload: GetNotesDto
  ): Promise<GetNotesResponseDto> {
    payload.createdBy = request?.user?._id;

    const response = await firstValueFrom(
      this.commonFeatureServiceClient.send(
        RMQ_MESSAGES.COMMON_FEATURES.NOTES.GET_NOTES,
        payload
      )
    );

    return response;
  }

  @Auth(true)
  @Get(API_ENDPOINTS.COMMON_FEATURES.NOTES.GET_NOTE)
  @ApiOkResponse({ type: GetNoteResponseDto })
  public async getNote(
    @Req() request: AppRequest,
    @Param() payload: GetNoteDto
  ): Promise<GetNoteResponseDto> {
    payload.createdBy = request?.user?._id;

    const response = await firstValueFrom(
      this.commonFeatureServiceClient.send(
        RMQ_MESSAGES.COMMON_FEATURES.NOTES.GET_NOTE,
        payload
      )
    );

    return response;
  }

  @Auth(true)
  @Patch(API_ENDPOINTS.COMMON_FEATURES.NOTES.UPDATE_NOTE)
  @ApiFormData({
    required: false,
    single: true,
    fieldName: 'file',
    fileTypes: ['jpg', 'png', 'jpeg'],
    errorMessage: 'Invalid document file entered.',
  })
  @ApiOkResponse({ type: UpdateNoteResponseDto })
  public async updateNote(
    @Req() request: AppRequest,
    @Param() params: IdDto,
    @Body() payload: UpdateNoteDto,
    @UploadedFile() file: any
  ): Promise<UpdateNoteResponseDto> {
    payload.updatedBy = request?.user?._id;
    payload.id = params?.id;
    payload.file = file;

    const response = await firstValueFrom(
      this.commonFeatureServiceClient.send(
        RMQ_MESSAGES.COMMON_FEATURES.NOTES.UPDATE_NOTE,
        payload
      )
    );

    //ActivityLog
    if (response?.data) {
      const params: ActivityLogParams = {
        performedBy: request?.user?._id,
        activityType: EActivityType.UPDATED,
        module: EActivitylogModule.NOTES,
        moduleId: response?.data?._id,
        moduleName: response?.data?.title || 'notes',
      };

      firstValueFrom(
        this.commonFeatureServiceClient.emit(
          RMQ_MESSAGES.ACTIVITY_LOG.ACTIVITY_LOG,
          {
            ...params,
          }
        )
      );
      response.data.activity = true;
    }

    return response;
  }

  @Auth(true)
  @Delete(API_ENDPOINTS.COMMON_FEATURES.NOTES.DELETE_NOTE)
  @ApiOkResponse({ type: DeleteNoteResponseDto })
  public async deleteNote(
    @Req() request: AppRequest,
    @Param() payload: DeleteNoteDto
  ): Promise<DeleteNoteResponseDto> {
    payload.deletedBy = request?.user?._id;

    const response = await firstValueFrom(
      this.commonFeatureServiceClient.send(
        RMQ_MESSAGES.COMMON_FEATURES.NOTES.DELETE_NOTE,
        payload
      )
    );

    //ActivityLog
    if (response?.data) {
      const params: ActivityLogParams = {
        performedBy: request?.user?._id,
        activityType: EActivityType.DELETED,
        module: EActivitylogModule.NOTES,
        moduleId: response?.data?._id,
        moduleName: response?.data?.title || 'notes',
      };

      firstValueFrom(
        this.commonFeatureServiceClient.emit(
          RMQ_MESSAGES.ACTIVITY_LOG.ACTIVITY_LOG,
          {
            ...params,
          }
        )
      );
      response.data.activity = true;
    }

    return response;
  }
}
