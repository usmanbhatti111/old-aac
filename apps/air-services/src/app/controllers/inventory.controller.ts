import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import { AddAssetDto } from '@shared/dto';
import { InventoryService } from '../services/inventory.service';

@Controller()
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.ASSETS.ADD_ASSETS)
  addAssets(@Payload() payload: AddAssetDto) {
    return this.inventoryService.addAssets(payload);
  }
  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.ASSETS.GET_ASSETS)
  getAssets() {
    return this.inventoryService.getAssets();
  }
}
