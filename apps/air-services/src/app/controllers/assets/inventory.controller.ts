import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import {
  AddInventoryDto,
  SearchInventoryDto,
  EditInventoryDto,
  GetInventoryDto,
} from '@shared/dto';
import { InventoryService } from '../../services/assets/inventory.service';

@Controller()
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.ASSETS.ADD_Inventory)
  addInventory(@Payload() payload: AddInventoryDto) {
    return this.inventoryService.addInventory(payload);
  }
  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.ASSETS.SEARCH_INVENTORY)
  searchInventory(@Payload() payload: SearchInventoryDto) {
    return this.inventoryService.searchInventory(payload);
  }

  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.ASSETS.EDIT_Inventory)
  editInventory(@Payload() payload: EditInventoryDto) {
    return this.inventoryService.editInventory(payload);
  }

  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.ASSETS.GET_Inventory)
  getInventory(@Payload() payload: GetInventoryDto) {
    return this.inventoryService.getInventory(payload);
  }
  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.ASSETS.Delete_Inventory)
  deleteInventory(@Payload() payload: { ids: string[] }) {
    return this.inventoryService.deleteInventory(payload);
  }
}
