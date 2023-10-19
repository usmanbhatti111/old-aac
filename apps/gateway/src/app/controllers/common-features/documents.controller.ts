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
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';
import {
  CreateFileDto,
  CreateFileResponseDto,
  CreateFolderDto,
  CreateFolderResponseDto,
  DeleteFileResponse,
  DeleteFolderResponse,
  EditFileDto,
  EditFileResponseDto,
  EditFolderDto,
  EditFolderResponseDto,
  FilterFolderDto,
  FilterFilesDto,
  GetFilesResponseDto,
  GetFoldersResponseDto,
  IdDto,
} from '@shared/dto';
import { firstValueFrom } from 'rxjs';
import { Auth } from '../../decorators/auth.decorator';
import { AppRequest } from '../../shared/interface/request.interface';
@ApiBearerAuth()
@ApiTags(API_TAGS.DOCUMENTS)
@Controller(CONTROLLERS.DOCUMENTS)
export class DocumentsController {
  constructor(
    @Inject(SERVICES.COMMON_FEATURE) private documentsServiceClient: ClientProxy
  ) {}

  @Auth(true)
  @Post(API_ENDPOINTS.DOCUMENTS.CREATE_FOLDER)
  @ApiCreatedResponse({ type: CreateFolderResponseDto })
  public async createFolder(
    @Req() req: AppRequest,
    @Body() payload: CreateFolderDto
  ) {
    payload.createdBy = req.user._id;
    payload.organizationId = req.user.organization;
    const response = await firstValueFrom(
      this.documentsServiceClient.send(
        RMQ_MESSAGES.DOCUMENTS.ADD_FOLDER,
        payload
      )
    );
    return response;
  }

  @Auth(true)
  @Post(API_ENDPOINTS.DOCUMENTS.CREATE_FILE)
  @ApiCreatedResponse({ type: CreateFileResponseDto })
  public async createFile(
    @Req() req: AppRequest,
    @Body() payload: CreateFileDto
  ) {
    payload.createdBy = req.user._id;
    payload.organizationId = req.user.organization;
    const response = await firstValueFrom(
      this.documentsServiceClient.send(
        RMQ_MESSAGES.DOCUMENTS.CREATE_FILE,
        payload
      )
    );
    return response;
  }

  @Auth(true)
  @Get(API_ENDPOINTS.DOCUMENTS.GET_FOLDERS)
  @ApiCreatedResponse({ type: GetFoldersResponseDto })
  public async getFolders(
    @Query() query: FilterFolderDto,
    @Req() req: AppRequest
  ) {
    query.organizationId = req.user.organization;
    const response = await firstValueFrom(
      this.documentsServiceClient.send(
        RMQ_MESSAGES.DOCUMENTS.GET_FOLDERS,
        query
      )
    );
    return response;
  }

  @Auth(true)
  @Delete(API_ENDPOINTS.DOCUMENTS.DELETE_FOLDERS)
  @ApiOkResponse({ type: DeleteFolderResponse })
  public async deleteFolders(@Query('ids') ids: string[]) {
    const response = await firstValueFrom(
      this.documentsServiceClient.send(RMQ_MESSAGES.DOCUMENTS.DELETE_FOLDERS, {
        ids,
      })
    );
    return response;
  }

  @Auth(true)
  @Get(API_ENDPOINTS.DOCUMENTS.GET_FILES)
  @ApiCreatedResponse({ type: GetFilesResponseDto })
  public async getFiles(@Query() query: FilterFilesDto) {
    const response = await firstValueFrom(
      this.documentsServiceClient.send(RMQ_MESSAGES.DOCUMENTS.GET_FILES, query)
    );
    return response;
  }

  @Auth(true)
  @Delete(API_ENDPOINTS.DOCUMENTS.DELETE_FILES)
  @ApiOkResponse({ type: DeleteFileResponse })
  public async deleteFiles(@Query('ids') ids: string[]) {
    const response = await firstValueFrom(
      this.documentsServiceClient.send(RMQ_MESSAGES.DOCUMENTS.DELETE_FILES, {
        ids,
      })
    );
    return response;
  }

  @Auth(true)
  @Patch(API_ENDPOINTS.DOCUMENTS.EDIT_FOLDER)
  @ApiOkResponse({ type: EditFolderResponseDto })
  public async editProduct(
    @Req() req: AppRequest,
    @Param() params: IdDto,
    @Body() payload: EditFolderDto
  ) {
    payload.updatedBy = req?.user?._id;
    payload.id = params.id;
    const response = await firstValueFrom(
      this.documentsServiceClient.send(
        RMQ_MESSAGES.DOCUMENTS.EDIT_FOLDER,
        payload
      )
    );

    return response;
  }

  @Auth(true)
  @Patch(API_ENDPOINTS.DOCUMENTS.EDIT_FILE)
  @ApiOkResponse({ type: EditFileResponseDto })
  public async editFile(
    @Req() request: AppRequest,
    @Param() params: IdDto,
    @Body() payload: EditFileDto
  ) {
    payload.updatedBy = request?.user?._id;
    payload.id = params.id;
    const response = await firstValueFrom(
      this.documentsServiceClient.send(
        RMQ_MESSAGES.DOCUMENTS.EDIT_FILE,
        payload
      )
    );

    return response;
  }
}
