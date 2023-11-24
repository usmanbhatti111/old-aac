import { Controller } from '@nestjs/common';
import { ImportFileService } from '../services/import-file.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import { ImportFileDTO } from '@shared/dto';
@Controller()
export class ImportFileController {
  constructor(private importFileService: ImportFileService) {}

  @MessagePattern(RMQ_MESSAGES.IMPORT_FILE.CREATE_IMPORT_FILE)
  public async createImportFile(@Payload() payload: ImportFileDTO) {
    return this.importFileService.createImportFile(payload);
  }
}
