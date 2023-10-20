import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import { ContactService } from '../services/contact.service';
import {
  AssignContactOwnerDto,
  ContactDeleteDto,
  ContactFilterDto,
  ContactNoteDeleteDto,
  ContactNoteFilterDto,
  CreateContactDto,
  CreateContactNoteDto,
  EditContactDto,
  EditContactNoteDto,
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

  @MessagePattern(RMQ_MESSAGES.CONTACT.CONTACT_NOTE.CREATE_CONTACT_NOTE)
  async addContactNote(@Payload() payload: CreateContactNoteDto) {
    return await this.contactService.createContactNote(payload);
  }

  @MessagePattern(RMQ_MESSAGES.CONTACT.CONTACT_NOTE.CONTACT_NOTE_LIST)
  async getContactNotes(@Payload() payload: ContactNoteFilterDto) {
    return await this.contactService.getContactNotes(payload);
  }

  @MessagePattern(RMQ_MESSAGES.CONTACT.CONTACT_NOTE.CONTACT_NOTE)
  async getContactNote(@Payload() payload: string) {
    return await this.contactService.getContactNote(payload);
  }

  @MessagePattern(RMQ_MESSAGES.CONTACT.CONTACT_NOTE.EDIT_CONTACT_NOTE)
  async editContactNote(@Payload() payload: EditContactNoteDto) {
    return await this.contactService.editContactNote(payload);
  }

  @MessagePattern(RMQ_MESSAGES.CONTACT.CONTACT_NOTE.DELETE_CONTACT_NOTE)
  async deleteContactNote(@Payload() payload: ContactNoteDeleteDto) {
    return await this.contactService.deleteContactNote(payload);
  }
}
