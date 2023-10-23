import { Controller } from '@nestjs/common';
import { AirServiceAttachmentService } from '../services/air-service-attachment.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import { AirAttachmentDTO, IdDto } from '@shared/dto';
@Controller()
export class AirServiceAttachmentController {
  constructor(private attachmentService: AirServiceAttachmentService) {}

  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.ATTACHMENT.ADD_ATTACHMENT)
  public async addAttachment(
    @Payload() payload: { fileUrl: any; dto: AirAttachmentDTO }
  ) {
    return this.attachmentService.addAttachment(payload);
  }
  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.ATTACHMENT.GET_ATTACHMENT)
  public async getAttachment(@Payload() payload: IdDto) {
    return this.attachmentService.getAttachment(payload);
  }
  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.ATTACHMENT.DELETE_ATTACHMENT)
  public async deleteAttachment(@Payload() payload: IdDto) {
    return this.attachmentService.deleteAttachment(payload);
  }
  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.ATTACHMENT.DELETE_ALL_ATTACHMENT)
  public async deleteAllAttachment(@Payload() payload: IdDto) {
    return this.attachmentService.deleteAllAttachment(payload);
  }
}
