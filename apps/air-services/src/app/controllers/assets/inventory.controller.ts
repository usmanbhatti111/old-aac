import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import { AddInventoryDto } from '@shared/dto';
import { InventoryService } from '../../services/assets/inventory.service';

@Controller()
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) { }

  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.ASSETS.ADD_Inventory)
  addInventory(@Payload() payload: AddInventoryDto) {
    return this.inventoryService.addInventory(payload);
  }
  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.ASSETS.GET_Inventory)
  getInventory() {
    return this.inventoryService.getInventory();
  }
}
