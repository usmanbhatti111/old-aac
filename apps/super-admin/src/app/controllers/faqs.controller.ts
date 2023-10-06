import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import { CreateFaqDto, FilterFaqsDto, IdDTO, UpdateFaqDto } from '@shared/dto';
import { FaqsService } from '../services/faqs.service';

@Controller()
export class FaqsController {
  constructor(private readonly faqsService: FaqsService) {}

  @MessagePattern({ cmd: RMQ_MESSAGES.FAQS.CREATE_FAQ })
  async createFaq(@Payload() payload: CreateFaqDto) {
    return await this.faqsService.createFaq(payload);
  }

  @MessagePattern({ cmd: RMQ_MESSAGES.FAQS.GET_FAQ })
  async getFaq(@Payload() payload: IdDTO) {
    return await this.faqsService.getFaq(payload);
  }

  @MessagePattern({ cmd: RMQ_MESSAGES.FAQS.GET_FAQS })
  async getFaqs(@Payload() payload: FilterFaqsDto) {
    return await this.faqsService.getFaqs(payload);
  }

  @MessagePattern({ cmd: RMQ_MESSAGES.FAQS.UPDATE_FAQ })
  async updateFaq(@Payload() payload: UpdateFaqDto) {
    return await this.faqsService.updateFaq(payload);
  }

  @MessagePattern({ cmd: RMQ_MESSAGES.FAQS.DELETE_FAQ })
  async deleteFaqs(@Payload() payload: IdDTO) {
    return await this.faqsService.deleteFaq(payload);
  }
}
