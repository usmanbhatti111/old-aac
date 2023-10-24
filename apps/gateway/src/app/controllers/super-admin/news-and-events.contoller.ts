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
  AddNewsOrEventDto,
  AddNewsOrEventResponseDto,
  DeleteNewsEventsResponseDto,
  DeleteNewsOrEventsDto,
  EditNewsOrEventDto,
  EditNewsOrEventResponseDto,
  GetNewsAndEventsResponseDto,
  GetNewsOrEventResponseDto,
  GetNewsOrEventsDto,
  IdDto,
} from '@shared/dto';
import { firstValueFrom } from 'rxjs';
import { AppRequest } from '../../shared/interface/request.interface';
import { Auth } from '../../decorators/auth.decorator';

@ApiBearerAuth()
@ApiTags(API_TAGS.NEWS_AND_EVENTS)
@Controller(CONTROLLERS.NEWS_AND_EVENTS)
export class NewsAndEventsController {
  constructor(
    @Inject(SERVICES.SUPER_ADMIN)
    private superAdminService: ClientProxy
  ) {}

  @Auth(true)
  @Post(API_ENDPOINTS.NEWS_AND_EVENTS.Add_NEWS_OR_EVENT)
  @ApiCreatedResponse({ type: AddNewsOrEventResponseDto })
  public async addNewsOrEvent(
    @Req() request: AppRequest,
    @Body() payload: AddNewsOrEventDto
  ): Promise<AddNewsOrEventResponseDto> {
    payload.createdBy = request?.user?._id;
    const response = await firstValueFrom(
      this.superAdminService.send(
        RMQ_MESSAGES.NEWS_AND_EVENTS.ADD_NEWS_AND_EVENTS,
        payload
      )
    );

    return response;
  }

  @Auth(true)
  @Get(API_ENDPOINTS.NEWS_AND_EVENTS.GET_NEWS_OR_EVENTS)
  @ApiOkResponse({ type: GetNewsAndEventsResponseDto })
  public async getNewsOrEvents(
    @Query() payload: GetNewsOrEventsDto
  ): Promise<GetNewsAndEventsResponseDto> {
    const response = await firstValueFrom(
      this.superAdminService.send(
        RMQ_MESSAGES.NEWS_AND_EVENTS.GET_NEWS_OR_EVENTS,
        payload
      )
    );

    return response;
  }

  @Auth(true)
  @Get(API_ENDPOINTS.NEWS_AND_EVENTS.GET_NEWS_OR_EVENT)
  @ApiOkResponse({ type: GetNewsOrEventResponseDto })
  public async getNewsOrEvent(
    @Param() payload: IdDto
  ): Promise<GetNewsOrEventResponseDto> {
    const response = await firstValueFrom(
      this.superAdminService.send(
        RMQ_MESSAGES.NEWS_AND_EVENTS.GET_NEWS_OR_EVENT,
        payload
      )
    );

    return response;
  }

  @Auth(true)
  @Patch(API_ENDPOINTS.NEWS_AND_EVENTS.EDIT_NEWS_OR_EVENT)
  @ApiOkResponse({ type: EditNewsOrEventResponseDto })
  public async editNewsOrEvent(
    @Req() request: AppRequest,
    @Param() params: IdDto,
    @Body() payload: EditNewsOrEventDto
  ): Promise<EditNewsOrEventResponseDto> {
    payload.updatedBy = request?.user?._id;
    payload.id = params.id;

    const response = await firstValueFrom(
      this.superAdminService.send(
        RMQ_MESSAGES.NEWS_AND_EVENTS.EDIT_NEWS_AND_EVENT,
        payload
      )
    );

    return response;
  }

  @Auth(true)
  @Delete(API_ENDPOINTS.NEWS_AND_EVENTS.DELETE_NEWS_OR_EVENTS)
  public async deleteNewsAndEvents(
    @Req() request: AppRequest,
    @Param() payload: DeleteNewsOrEventsDto
  ): Promise<DeleteNewsEventsResponseDto> {
    payload.deletedBy = request?.user?._id;
    const response = await firstValueFrom(
      this.superAdminService.send(
        RMQ_MESSAGES.NEWS_AND_EVENTS.DELETE_NEWS_OR_EVENTS,
        payload
      )
    );

    return response;
  }
}
