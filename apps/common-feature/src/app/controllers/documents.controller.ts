import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import {
  CreateFileDto,
  CreateFolderDto,
  EditFileDto,
  EditFolderDto,
  FilterFolderDto,
  FilterFilesDto,
} from '@shared/dto';
import { DocumentsService } from '../services/documents.service';

@Controller()
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @MessagePattern(RMQ_MESSAGES.DOCUMENTS.ADD_FOLDER)
  async createFolder(@Payload() payload: CreateFolderDto) {
    return await this.documentsService.createFolder(payload);
  }
  @MessagePattern(RMQ_MESSAGES.DOCUMENTS.CREATE_FILE)
  async createFile(@Payload() payload: CreateFileDto) {
    return await this.documentsService.createFile(payload);
  }

  @MessagePattern(RMQ_MESSAGES.DOCUMENTS.GET_FOLDERS)
  async getFolders(@Payload() payload: FilterFolderDto) {
    return await this.documentsService.getFolders(payload);
  }

  @MessagePattern(RMQ_MESSAGES.DOCUMENTS.DELETE_FOLDERS)
  deleteFolder(@Payload() payload: { ids: string[] }) {
    return this.documentsService.deleteFolders(payload);
  }

  @MessagePattern(RMQ_MESSAGES.DOCUMENTS.GET_FILES)
  async getFiles(@Payload() payload: FilterFilesDto) {
    return await this.documentsService.getFiles(payload);
  }

  @MessagePattern(RMQ_MESSAGES.DOCUMENTS.DELETE_FILES)
  deleteFiles(@Payload() payload: { ids: string[] }) {
    return this.documentsService.deleteFiles(payload);
  }

  @MessagePattern(RMQ_MESSAGES.DOCUMENTS.EDIT_FOLDER)
  editFolder(@Payload() payload: EditFolderDto) {
    return this.documentsService.editFolder(payload);
  }

  @MessagePattern(RMQ_MESSAGES.DOCUMENTS.EDIT_FILE)
  editFile(@Payload() payload: EditFileDto) {
    return this.documentsService.editFile(payload);
  }
}
