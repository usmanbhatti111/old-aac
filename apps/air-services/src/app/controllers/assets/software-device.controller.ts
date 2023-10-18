import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import { AssetsSoftwareDeviceDto, IdDto } from '@shared/dto';
import { SoftwareDeviceService } from '../../services/assets/software-device.service';

@Controller()
export class SoftwareDeviceController {
  constructor(private softwareDeviceService: SoftwareDeviceService) {}

  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.ASSETS.ADD_SOFTWARE_DEVICE)
  addSoftwareDevice(
    @Payload() payload: { id: IdDto; softwareId: AssetsSoftwareDeviceDto }
  ) {
    return this.softwareDeviceService.addSoftwareDevice(payload);
  }

  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.ASSETS.DELETE_SOFTWARE_DEVICE)
  removeSoftwareDevice(
    @Payload() payload: { id: IdDto; softwareId: AssetsSoftwareDeviceDto }
  ) {
    return this.softwareDeviceService.removeSoftwareDevice(payload);
  }
}
