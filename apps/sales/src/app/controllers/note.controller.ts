import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import {
  CreateNoteDto,
  DeleteNoteDto,
  UpdateNoteDto,
  GetNotesDto,
  IdDto,
} from '@shared/dto';
import { NoteService } from '../services/note.service';

@Controller()
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @MessagePattern(RMQ_MESSAGES.DEAL_NOTE.CREATE_DEAL_NOTE)
  async addNote(@Payload() payload: CreateNoteDto) {
    return this.noteService.createNote(payload);
  }

  @MessagePattern(RMQ_MESSAGES.DEAL_NOTE.GET_DEAL_NOTES)
  async getNotes(@Payload() payload: GetNotesDto) {
    return this.noteService.getNotes(payload);
  }

  @MessagePattern(RMQ_MESSAGES.DEAL_NOTE.GET_DEAL_NOTE)
  async getNote(@Payload() payload: IdDto) {
    return this.noteService.getNote(payload);
  }

  @MessagePattern(RMQ_MESSAGES.DEAL_NOTE.UPDATE_DEAL_NOTE)
  async updateNote(@Payload() payload: UpdateNoteDto) {
    return this.noteService.updateNote(payload);
  }

  @MessagePattern(RMQ_MESSAGES.DEAL_NOTE.DELETE_DEAL_NOTE)
  async deleteNote(@Payload() payload: DeleteNoteDto) {
    return this.noteService.deleteNote(payload);
  }
}
