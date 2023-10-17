import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import { ContactService } from '../services/contact.service';
import {
  AssignContactOwnerDto,
  ContactDeleteDto,
  ContactFilterDto,
  CreateContactDto,
  EditContactDto,
} from '@shared/dto';

@Controller()
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @MessagePattern(RMQ_MESSAGES.CONTACT.CREATE_CONTACT)
  async createContact(@Payload() payload: CreateContactDto) {
    return await this.contactService.createContact(payload);
  }

  @MessagePattern(RMQ_MESSAGES.CONTACT.CONTACT_LIST)
  async getContacts(@Payload() payload: ContactFilterDto) {
    return await this.contactService.getContacts(payload);
  }

  @MessagePattern(RMQ_MESSAGES.CONTACT.CONTACT)
  async getContact(@Payload() payload: string) {
    return await this.contactService.getContact(payload);
  }

  @MessagePattern(RMQ_MESSAGES.CONTACT.EDIT_CONTACT)
  async editContact(@Payload() payload: EditContactDto) {
    return await this.contactService.editContact(payload);
  }

  @MessagePattern(RMQ_MESSAGES.CONTACT.DELETE_CONTACT)
  async deleteContact(@Payload() payload: ContactDeleteDto) {
    return await this.contactService.deleteContact(payload);
  }

  @MessagePattern(RMQ_MESSAGES.CONTACT.ASSIGN_CONTACT_OWNER)
  async assignContactOwner(@Payload() payload: AssignContactOwnerDto) {
    return await this.contactService.assignContactOwner(payload);
  }
}
