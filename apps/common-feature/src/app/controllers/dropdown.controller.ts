import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';

import { DropdownService } from '../services/dropdown.service';
import { GetAllSearchDTO } from '@shared/dto';

@Controller()
export class DropdownController {
  constructor(private readonly dropdownService: DropdownService) {}

  @MessagePattern({ cmd: RMQ_MESSAGES.DROPDOWNS.ORGANIZATIONS_DROPDOWN })
  async getallOrganizations(@Payload() payload: GetAllSearchDTO) {
    return this.dropdownService.getallOrganizations(payload);
  }

  @MessagePattern({ cmd: RMQ_MESSAGES.DROPDOWNS.PRODUCTS_DROPDOWN })
  async getallProducts(@Payload() payload: GetAllSearchDTO) {
    return this.dropdownService.getallProducts(payload);
  }
}
