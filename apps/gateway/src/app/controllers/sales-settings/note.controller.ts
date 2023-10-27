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
  CreateNoteDto,
  NoteResponseDto,
  DeleteNoteDto,
  DeleteNoteResponseDto,
  UpdateNoteDto,
  GetNotesDto,
  NotesResponseDto,
  IdDto,
} from '@shared/dto';
import { firstValueFrom } from 'rxjs';
import { Auth } from '../../decorators/auth.decorator';
import { AppRequest } from '../../shared/interface/request.interface';

@ApiBearerAuth()
@ApiTags(API_TAGS.DEAL_NOTE)
@Controller(CONTROLLERS.DEAL_NOTE)
export class NoteController {
  constructor(
    @Inject(SERVICES.SALES) private salesServiceClient: ClientProxy
  ) {}

  @Auth(true)
  @Post(API_ENDPOINTS.DEAL_NOTE.CREATE_DEAL_NOTE)
  @ApiCreatedResponse({ type: NoteResponseDto })
  public async addNote(
    @Req() request: AppRequest,
    @Body() payload: CreateNoteDto
  ): Promise<NoteResponseDto> {
    payload.createdBy = request?.user?._id;

    const response = await firstValueFrom(
      this.salesServiceClient.send(
        RMQ_MESSAGES.DEAL_NOTE.CREATE_DEAL_NOTE,
        payload
      )
    );

    return response;
  }

  @Auth(true)
  @Get(API_ENDPOINTS.DEAL_NOTE.GET_DEAL_NOTES)
  @ApiOkResponse({ type: NotesResponseDto })
  public async getNotes(
    @Req() request: AppRequest,
    @Query() payload: GetNotesDto
  ): Promise<NotesResponseDto> {
    const response = await firstValueFrom(
      this.salesServiceClient.send(
        RMQ_MESSAGES.DEAL_NOTE.GET_DEAL_NOTES,
        payload
      )
    );

    return response;
  }

  @Get(API_ENDPOINTS.DEAL_NOTE.GET_DEAL_NOTE)
  @ApiOkResponse({ type: NoteResponseDto })
  public async getNote(
    @Param() payload: IdDto
  ): Promise<NoteResponseDto> {
    const response = await firstValueFrom(
      this.salesServiceClient.send(
        RMQ_MESSAGES.DEAL_NOTE.GET_DEAL_NOTE,
        payload
      )
    );

    return response;
  }

  @Auth(true)
  @Patch(API_ENDPOINTS.DEAL_NOTE.UPDATE_DEAL_NOTE)
  @ApiOkResponse({ type: NoteResponseDto })
  public async editContactStatus(
    @Req() request: AppRequest,
    @Param() params: IdDto,
    @Body() payload: UpdateNoteDto
  ): Promise<NoteResponseDto> {
    payload.updatedBy = request?.user?._id;
    payload.id = params.id;

    const response = await firstValueFrom(
      this.salesServiceClient.send(
        RMQ_MESSAGES.DEAL_NOTE.UPDATE_DEAL_NOTE,
        payload
      )
    );

    return response;
  }

  @Auth(true)
  @Delete(API_ENDPOINTS.DEAL_NOTE.DELETE_DEAL_NOTE)
  @ApiOkResponse({ type: DeleteNoteResponseDto })
  public async deleteNewsAndEvents(
    @Req() request: AppRequest,
    @Param() payload: DeleteNoteDto
  ): Promise<DeleteNoteResponseDto> {
    payload.deletedBy = request?.user?._id;

    const response = await firstValueFrom(
      this.salesServiceClient.send(
        RMQ_MESSAGES.DEAL_NOTE.DELETE_DEAL_NOTE,
        payload
      )
    );

    return response;
  }
}
