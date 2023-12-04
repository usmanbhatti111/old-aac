import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';

import {
  AddVendorRequestDTO,
  ListVendorsRequestDto,
  UpdateVendorRequestDTO,
} from '@shared/dto';
import { VendorsService } from '../../../services/settings/asset-management/vendors.service';
@Controller()
export class VendorController {
  constructor(private vendorsService: VendorsService) {}

  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.SETTINGS.VENDORS.ADD_VENDORS)
  public async createTask(@Payload() payload: AddVendorRequestDTO) {
    return this.vendorsService.addVendor(payload);
  }

  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.SETTINGS.VENDORS.GET_VENDORS)
  getVendor(@Payload() payload: ListVendorsRequestDto) {
    return this.vendorsService.getVendors(payload);
  }

  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.SETTINGS.VENDORS.UPDATE_VENDORS)
  updateVendor(@Payload() payload: UpdateVendorRequestDTO) {
    return this.vendorsService.updateVendor(payload);
  }
}
