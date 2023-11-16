import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import {
  CreateNoteDto,
  DeleteNoteDto,
  GetNoteDto,
  GetNotesDto,
  UpdateNoteDto,
} from '@shared/dto';
import { NoteService } from '../services/note.service';

@Controller()
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @MessagePattern(RMQ_MESSAGES.COMMON_FEATURES.NOTES.CREATE_NOTE)
  async addNote(@Payload() payload: CreateNoteDto) {
    return this.noteService.createNote(payload);
  }

  @MessagePattern(RMQ_MESSAGES.COMMON_FEATURES.NOTES.GET_NOTES)
  async getNotes(@Payload() payload: GetNotesDto) {
    return this.noteService.getNotes(payload);
  }

  @MessagePattern(RMQ_MESSAGES.COMMON_FEATURES.NOTES.GET_NOTE)
  async getNote(@Payload() payload: GetNoteDto) {
    return this.noteService.getNote(payload);
  }

  @MessagePattern(RMQ_MESSAGES.COMMON_FEATURES.NOTES.UPDATE_NOTE)
  async updateNote(@Payload() payload: UpdateNoteDto) {
    return this.noteService.updateNote(payload);
  }

  @MessagePattern(RMQ_MESSAGES.COMMON_FEATURES.NOTES.DELETE_NOTE)
  async deleteNote(@Payload() payload: DeleteNoteDto) {
    return this.noteService.deleteNote(payload);
  }
}
