import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';

import { AddVendorRequestDTO, IdDTO, ListVendorsRequestDto } from '@shared/dto';
import { VendorsService } from '../../../services/settings/asset-management/vendors.service';
@Controller()
export class VendorController {
  constructor(private vendorsService: VendorsService) {}

  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.SETTINGS.VENDORS.ADD_VENDORS)
  public async createTask(@Payload() payload: AddVendorRequestDTO) {
    return this.vendorsService.addVendor(payload);
  }

  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.SETTINGS.VENDORS.GET_VENDORS)
  getTasks(@Payload() payload: ListVendorsRequestDto) {
    return this.vendorsService.getVendors(payload);
  }

  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.SETTINGS.VENDORS.GET_VENDOR)
  getVendor(@Payload() payload: IdDTO) {
    return this.vendorsService.getVendor(payload);
  }
}
