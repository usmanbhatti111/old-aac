import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import { ContactService } from '../services/contact.service';
import { CreateContactDto } from '@shared/dto';

@Controller()
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @MessagePattern({ cmd: RMQ_MESSAGES.CONTACT.CREATE_CONTACT })
  async createContact(@Payload() payload: CreateContactDto) {
    return await this.contactService.createContact(payload);
  }
}
