import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import { ContactService } from '../services/contact.service';
import {
  AssignContactOwnerDto,
  ContactCallDeleteDto,
  ContactCallFilterDto,
  ContactCallIdParamDto,
  ContactDeleteDto,
  ContactDeletedFilterDto,
  ContactFilterDto,
  ContactIdParamDto,
  ContactMeetingDeleteDto,
  ContactMeetingFilterDto,
  ContactMeetingIdParamDto,
  ContactMultiDto,
  ContactNoteDeleteDto,
  ContactNoteFilterDto,
  ContactNoteIdParamDto,
  CreateContactCallDto,
  CreateContactDto,
  CreateContactMeetingDto,
  CreateContactNoteDto,
  EditContactCallDto,
  EditContactDto,
  EditContactMeetingDto,
  EditContactNoteDto,
  GetContactAssociatinsDto,
  ImportContactDto,
  RescheduleContactCallDto,
  RescheduleContactMeetingDto,
  ResetOutcomeContactCallDto,
  ResetOutcomeContactMeetingDto,
} from '@shared/dto';

@Controller()
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @MessagePattern(RMQ_MESSAGES.CONTACT.IMPORT_CONTACT)
  async importContact(@Payload() payload: ImportContactDto) {
    return await this.contactService.importContact(payload);
  }

  @MessagePattern(RMQ_MESSAGES.CONTACT.PERMANENT_DELETE_CONTACT_MULTI)
  async permanentDeleteContactMulti(@Payload() payload: ContactMultiDto) {
    return await this.contactService.permanentDeleteContactMulti(payload);
  }

  @MessagePattern(RMQ_MESSAGES.CONTACT.RESTORE_CONTACT_MULTI)
  async restoreContactMulti(@Payload() payload: ContactMultiDto) {
    return await this.contactService.restoreContactMulti(payload);
  }

  @MessagePattern(RMQ_MESSAGES.CONTACT.ASSIGN_CONTACT_OWNER_MULTI)
  async assignContactOwnerMulti(@Payload() payload: ContactMultiDto) {
    return await this.contactService.assignContactOwnerMulti(payload);
  }

  @MessagePattern(RMQ_MESSAGES.CONTACT.DELETE_CONTACT_MULTI)
  async deleteContactMulti(@Payload() payload: ContactMultiDto) {
    return await this.contactService.deleteContactMulti(payload);
  }

  @MessagePattern(RMQ_MESSAGES.CONTACT.CONTACT_DELETED_LIST)
  async getDeletedContacts(@Payload() payload: ContactDeletedFilterDto) {
    return await this.contactService.getDeletedContacts(payload);
  }

  @MessagePattern(RMQ_MESSAGES.CONTACT.PERMANENT_DELETE_CONTACT)
  async permanentDeleteContact(@Payload() payload: ContactDeleteDto) {
    return await this.contactService.permanentDeleteContact(payload);
  }

  @MessagePattern(RMQ_MESSAGES.CONTACT.DELETE_CONTACT)
  async restoreContact(@Payload() payload: ContactIdParamDto) {
    return await this.contactService.restoreContact(payload);
  }

  @MessagePattern(RMQ_MESSAGES.CONTACT.CONTACT_ASSOCIATIONS)
  async getContactAssociations(@Payload() payload: GetContactAssociatinsDto) {
    return await this.contactService.getContactAssociations(payload);
  }

  @MessagePattern(RMQ_MESSAGES.CONTACT.CONTACT_ASSOCIATIONS)
  async getContactTasks(@Payload() payload: ContactNoteFilterDto) {
    return await this.contactService.getContactTasks(payload);
  }

  @MessagePattern(RMQ_MESSAGES.CONTACT.CREATE_CONTACT)
  async createContact(@Payload() payload: CreateContactDto) {
    return await this.contactService.createContact(payload);
  }

  @MessagePattern(RMQ_MESSAGES.CONTACT.CONTACT_LIST)
  async getContacts(@Payload() payload: ContactFilterDto) {
    return await this.contactService.getContacts(payload);
  }

  @MessagePattern(RMQ_MESSAGES.CONTACT.CONTACT)
  async getContact(@Payload() payload: ContactIdParamDto) {
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
  async getContactNote(@Payload() payload: ContactNoteIdParamDto) {
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

  @MessagePattern(RMQ_MESSAGES.CONTACT.CONTACT_CALL.CREATE_CONTACT_CALL)
  async addContactCall(@Payload() payload: CreateContactCallDto) {
    return await this.contactService.createContactCall(payload);
  }

  @MessagePattern(RMQ_MESSAGES.CONTACT.CONTACT_CALL.CONTACT_CALL_LIST)
  async getContactCalls(@Payload() payload: ContactCallFilterDto) {
    return await this.contactService.getContactCalls(payload);
  }

  @MessagePattern(RMQ_MESSAGES.CONTACT.CONTACT_CALL.CONTACT_CALL)
  async getContactCall(@Payload() payload: ContactCallIdParamDto) {
    return await this.contactService.getContactCall(payload);
  }

  @MessagePattern(RMQ_MESSAGES.CONTACT.CONTACT_CALL.EDIT_CONTACT_CALL)
  async editContactCall(@Payload() payload: EditContactCallDto) {
    return await this.contactService.editContactCall(payload);
  }

  @MessagePattern(RMQ_MESSAGES.CONTACT.CONTACT_CALL.DELETE_CONTACT_CALL)
  async deleteContactCall(@Payload() payload: ContactCallDeleteDto) {
    return await this.contactService.deleteContactCall(payload);
  }

  @MessagePattern(RMQ_MESSAGES.CONTACT.CONTACT_CALL.RESCHEDULE_CONTACT_CALL)
  async rescheduleContactCall(@Payload() payload: RescheduleContactCallDto) {
    return await this.contactService.rescheduleContactCall(payload);
  }

  @MessagePattern(RMQ_MESSAGES.CONTACT.CONTACT_CALL.RESET_OUTCOME_CONTACT_CALL)
  async resetOutcomeContactCall(
    @Payload() payload: ResetOutcomeContactCallDto
  ) {
    return await this.contactService.resetOutcomeContactCall(payload);
  }

  @MessagePattern(RMQ_MESSAGES.CONTACT.CONTACT_CALL.CONTACT_CALL_STATUS)
  async getContactCallsStatus(@Payload() payload: ContactIdParamDto) {
    return await this.contactService.getContactCallsStatus(payload);
  }

  @MessagePattern(RMQ_MESSAGES.CONTACT.CONTACT_MEETING.CREATE_CONTACT_MEETING)
  async addContactMeeting(@Payload() payload: CreateContactMeetingDto) {
    return await this.contactService.createContactMeeting(payload);
  }

  @MessagePattern(RMQ_MESSAGES.CONTACT.CONTACT_MEETING.CONTACT_MEETING_LIST)
  async getContactMeetings(@Payload() payload: ContactMeetingFilterDto) {
    return await this.contactService.getContactMeetings(payload);
  }

  @MessagePattern(RMQ_MESSAGES.CONTACT.CONTACT_MEETING.CONTACT_MEETING)
  async getContactMeeting(@Payload() payload: ContactMeetingIdParamDto) {
    return await this.contactService.getContactMeeting(payload);
  }

  @MessagePattern(RMQ_MESSAGES.CONTACT.CONTACT_MEETING.EDIT_CONTACT_MEETING)
  async editContactMeeting(@Payload() payload: EditContactMeetingDto) {
    return await this.contactService.editContactMeeting(payload);
  }

  @MessagePattern(RMQ_MESSAGES.CONTACT.CONTACT_MEETING.DELETE_CONTACT_MEETING)
  async deleteContactMeeting(@Payload() payload: ContactMeetingDeleteDto) {
    return await this.contactService.deleteContactMeeting(payload);
  }

  @MessagePattern(
    RMQ_MESSAGES.CONTACT.CONTACT_MEETING.RESCHEDULE_CONTACT_MEETING
  )
  async rescheduleContactMeeting(
    @Payload() payload: RescheduleContactMeetingDto
  ) {
    return await this.contactService.rescheduleContactMeeting(payload);
  }

  @MessagePattern(
    RMQ_MESSAGES.CONTACT.CONTACT_MEETING.RESET_OUTCOME_CONTACT_MEETING
  )
  async resetOutcomeContactMeeting(
    @Payload() payload: ResetOutcomeContactMeetingDto
  ) {
    return await this.contactService.resetOutcomeContactMeeting(payload);
  }

  @MessagePattern(RMQ_MESSAGES.CONTACT.CONTACT_MEETING.CONTACT_MEETING_STATUS)
  async getContactMeetingsStatus(@Payload() payload: ContactIdParamDto) {
    return await this.contactService.getContactMeetingsStatus(payload);
  }
}
