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

@ApiBearerAuth()
@ApiTags(API_TAGS.NEWS_AND_EVENTS)
@Controller(CONTROLLERS.NEWS_AND_EVENTS)
export class NewsAndEventsController {
  constructor(
    @Inject(SERVICES.SUPER_ADMIN)
    private superAdminService: ClientProxy
  ) {}

  @Post(API_ENDPOINTS.NEWS_AND_EVENTS.Add_NEWS_OR_EVENT)
  @ApiCreatedResponse({ type: AddNewsOrEventResponseDto })
  public async addNewsOrEvent(
    @Body() payload: AddNewsOrEventDto
  ): Promise<AddNewsOrEventResponseDto> {
    payload.createdBy = '56cb91bdc3464f14678934ca'; // TODO get user id from token data
    const response = await firstValueFrom(
      this.superAdminService.send(
        RMQ_MESSAGES.NEWS_AND_EVENTS.ADD_NEWS_AND_EVENTS,
        payload
      )
    );

    return response;
  }

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

  @Patch(API_ENDPOINTS.NEWS_AND_EVENTS.EDIT_NEWS_OR_EVENT)
  @ApiOkResponse({ type: EditNewsOrEventResponseDto })
  public async editNewsOrEvent(
    @Param() params: IdDto,
    @Body() payload: EditNewsOrEventDto
  ): Promise<EditNewsOrEventResponseDto> {
    payload.updatedBy = '56cb91bdc3464f14678934ca'; // TODO get user id from token data
    payload.id = params.id;

    const response = await firstValueFrom(
      this.superAdminService.send(
        RMQ_MESSAGES.NEWS_AND_EVENTS.EDIT_NEWS_AND_EVENT,
        payload
      )
    );

    return response;
  }

  @Delete(API_ENDPOINTS.NEWS_AND_EVENTS.DELETE_NEWS_OR_EVENTS)
  public async deleteNewsAndEvents(
    @Param() payload: DeleteNewsOrEventsDto
  ): Promise<DeleteNewsEventsResponseDto> {
    payload.deletedBy = '56cb91bdc3464f14678934ca'; // TODO get user id from token data
    const response = await firstValueFrom(
      this.superAdminService.send(
        RMQ_MESSAGES.NEWS_AND_EVENTS.DELETE_NEWS_OR_EVENTS,
        payload
      )
    );

    return response;
  }
}
