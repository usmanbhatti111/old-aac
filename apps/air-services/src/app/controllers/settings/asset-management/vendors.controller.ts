import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';

import { AddVendorDTO } from '@shared/dto';
import { VendorsService } from '../../../services/settings/vendors.sevice';
@Controller()
export class VendorController {
  constructor(private vendorsService: VendorsService) {}

  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.VENDORS.ADD_VENDORS)
  public async createTask(@Payload() payload: AddVendorDTO) {
    return this.vendorsService.addVendor(payload);
  }

  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.VENDORS.GET_VENDORS)
  getTasks(@Payload() payload: any) {
    return this.vendorsService.getVendors(payload);
  }
}
