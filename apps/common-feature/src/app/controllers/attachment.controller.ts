import { Controller } from '@nestjs/common';
import { AttachmentService } from '../services/attachment.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import { AttachmentDTO, IdDto } from '@shared/dto';
@Controller()
export class AttachmentController {
  constructor(private attachmentService: AttachmentService) {}

  @MessagePattern(RMQ_MESSAGES.ATTACHMENT.ADD_ATTACHMENT)
  public async addAttachment(
    @Payload() payload: { fileUrl: any; dto: AttachmentDTO }
  ) {
    return this.attachmentService.addAttachment(payload);
  }
  @MessagePattern(RMQ_MESSAGES.ATTACHMENT.GET_ATTACHMENT)
  public async getAttachment(@Payload() payload: IdDto) {
    return this.attachmentService.getAttachment(payload);
  }
  @MessagePattern(RMQ_MESSAGES.ATTACHMENT.DELETE_ATTACHMENT)
  public async deleteAttachment(@Payload() payload: IdDto) {
    return this.attachmentService.deleteAttachment(payload);
  }
  @MessagePattern(RMQ_MESSAGES.ATTACHMENT.DELETE_ALL_ATTACHMENT)
  public async deleteAllAttachment(@Payload() payload: IdDto) {
    return this.attachmentService.deleteAllAttachment(payload);
  }
}
