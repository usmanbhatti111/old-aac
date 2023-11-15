import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';

import { DropdownService } from '../services/dropdown.service';

@Controller()
export class DropdownController {
  constructor(private readonly dropdownService: DropdownService) {}

  @MessagePattern({ cmd: RMQ_MESSAGES.DROPDOWNS.ORGANIZATIONS_DROPDOWN })
  async getallOrganizations() {
    return this.dropdownService.getallOrganizations();
  }

  @MessagePattern({ cmd: RMQ_MESSAGES.DROPDOWNS.PRODUCTS_DROPDOWN })
  async getallProducts() {
    return this.dropdownService.getallProducts();
  }
}
