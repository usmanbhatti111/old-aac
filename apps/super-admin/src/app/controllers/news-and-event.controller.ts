import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import {
  AddNewsOrEventDto,
  DeleteNewsOrEventsDto,
  EditNewsOrEventDto,
  GetNewsOrEventsDto,
  IdDto,
} from '@shared/dto';
import { NewsAndEventsService } from '../services/news-and-event.service';

@Controller()
export class NewsAndEventsController {
  constructor(private readonly newsAndEventsService: NewsAndEventsService) {}

  @MessagePattern(RMQ_MESSAGES.NEWS_AND_EVENTS.ADD_NEWS_AND_EVENTS)
  addNewsOrEvent(@Payload() payload: AddNewsOrEventDto) {
    return this.newsAndEventsService.addNewsOrEvent(payload);
  }

  @MessagePattern(RMQ_MESSAGES.NEWS_AND_EVENTS.GET_NEWS_OR_EVENTS)
  getNewsOrEvents(@Payload() payload: GetNewsOrEventsDto) {
    return this.newsAndEventsService.getNewsOrEvents(payload);
  }

  @MessagePattern(RMQ_MESSAGES.NEWS_AND_EVENTS.GET_NEWS_OR_EVENT)
  getNewsOrEvent(@Payload() payload: IdDto) {
    return this.newsAndEventsService.getNewsOrEvent(payload);
  }

  @MessagePattern(RMQ_MESSAGES.NEWS_AND_EVENTS.EDIT_NEWS_AND_EVENT)
  editNewsOrEvent(@Payload() payload: EditNewsOrEventDto) {
    return this.newsAndEventsService.editNewsOrEvent(payload);
  }

  @MessagePattern(RMQ_MESSAGES.NEWS_AND_EVENTS.DELETE_NEWS_OR_EVENTS)
  deleteNewsAndEvents(@Payload() payload: DeleteNewsOrEventsDto) {
    return this.newsAndEventsService.deleteNewsAndEvents(payload);
  }
}
