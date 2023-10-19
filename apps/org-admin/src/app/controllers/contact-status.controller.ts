import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import {
  AddContactStatusDto,
  DeleteContactStatusDto,
  EditContactStatusDto,
  GetContactStatusesDto,
  IdDto,
} from '@shared/dto';
import { ContactStatusService } from '../services/contact-status.service';

@Controller()
export class ContactStatusController {
  constructor(private readonly contactStatusService: ContactStatusService) {}

  @MessagePattern(RMQ_MESSAGES.ORG_ADMIN.CONTACT_STATUS.ADD_CONTACT_STATUS)
  async addContactStatus(@Payload() payload: AddContactStatusDto) {
    return this.contactStatusService.addContactStatus(payload);
  }

  @MessagePattern(RMQ_MESSAGES.ORG_ADMIN.CONTACT_STATUS.GET_CONTACT_STATUSES)
  async getContactStatuses(@Payload() payload: GetContactStatusesDto) {
    return this.contactStatusService.getContactStatuses(payload);
  }

  @MessagePattern(RMQ_MESSAGES.ORG_ADMIN.CONTACT_STATUS.GET_CONTACT_STATUS)
  async getContactStatus(@Payload() payload: IdDto) {
    return this.contactStatusService.getContactStatus(payload);
  }

  @MessagePattern(RMQ_MESSAGES.ORG_ADMIN.CONTACT_STATUS.EDIT_CONTACT_STATUS)
  async editContactStatus(@Payload() payload: EditContactStatusDto) {
    return this.contactStatusService.editContactStatus(payload);
  }

  @MessagePattern(RMQ_MESSAGES.ORG_ADMIN.CONTACT_STATUS.DELETE_CONTACT_STATUS)
  async deleteContactStatus(@Payload() payload: DeleteContactStatusDto) {
    return this.contactStatusService.deleteContactStatus(payload);
  }
}
