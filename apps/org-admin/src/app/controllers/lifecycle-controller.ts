import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import {
  AddLifecycleStageDto,
  DeleteLifecycleStageDto,
  EditLifecycleStageDto,
  GetLifecycleStagesDto,
  IdDto,
} from '@shared/dto';
import { LifecycleStagesService } from '../services/lifecycle-stages.service';

@Controller()
export class LifecycleStagesController {
  constructor(
    private readonly lifecycleStagesService: LifecycleStagesService
  ) {}

  @MessagePattern(RMQ_MESSAGES.ORG_ADMIN.LIFECYCLE_STAGES.ADD_LIFECYCLE_STAGE)
  async addLifecycleStage(@Payload() payload: AddLifecycleStageDto) {
    return this.lifecycleStagesService.addLifecycleStage(payload);
  }

  @MessagePattern(RMQ_MESSAGES.ORG_ADMIN.LIFECYCLE_STAGES.GET_LIFECYCLE_STAGES)
  async getContactStatuses(@Payload() payload: GetLifecycleStagesDto) {
    return this.lifecycleStagesService.getLifecycleStages(payload);
  }

  @MessagePattern(RMQ_MESSAGES.ORG_ADMIN.LIFECYCLE_STAGES.GET_LIFECYCLE_STAGE)
  async getContactStatus(@Payload() payload: IdDto) {
    return this.lifecycleStagesService.getLifecycleStage(payload);
  }

  @MessagePattern(RMQ_MESSAGES.ORG_ADMIN.LIFECYCLE_STAGES.EDIT_LIFECYCLE_STAGE)
  async editContactStatus(@Payload() payload: EditLifecycleStageDto) {
    return this.lifecycleStagesService.editLifecycleStage(payload);
  }

  @MessagePattern(
    RMQ_MESSAGES.ORG_ADMIN.LIFECYCLE_STAGES.DELETE_LIFECYCLE_STAGE
  )
  async deleteContactStatus(@Payload() payload: DeleteLifecycleStageDto) {
    return this.lifecycleStagesService.deleteLifecycleStage(payload);
  }
}
