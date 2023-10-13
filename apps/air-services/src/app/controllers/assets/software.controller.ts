import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import { AssetsSoftwareDto, IdDto } from '@shared/dto';

import { AssetsSoftwareAssignDto } from '@shared/dto';
import { SoftwareService } from '../../services/assets/software.service';

@Controller()
export class SoftwareController {
  constructor(private softwareService: SoftwareService) {}

  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.ASSETS.ADD_SOFTWARE)
  addSoftware(@Payload() payload: AssetsSoftwareDto) {
    return this.softwareService.addSoftware(payload);
  }
  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.ASSETS.EDIT_SOFTWARE)
  editSoftware(@Payload() payload: { id: IdDto; dto: AssetsSoftwareDto }) {
    return this.softwareService.editSoftware(payload);
  }
  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.ASSETS.DELETE_SOFTWARE)
  deleteSoftware(@Payload() payload: { id: IdDto }) {
    return this.softwareService.deleteSoftware(payload);
  }
  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.ASSETS.ASSIGN_CATEGORY)
  assignCatToSoftware(@Payload() payload: AssetsSoftwareAssignDto) {
    return this.softwareService.assignCatToSoftware(payload);
  }
}
