import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import {
  AddPurchaseDto,
  DeletePurchaseDto,
  UpdatePurchaseDto,
} from '@shared/dto';
import { PurchaseService } from '../../services/assets/purchase.service';

@Controller()
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}
  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.ASSETS.ADD_PURCHASE)
  addPurchase(@Payload() payload: AddPurchaseDto) {
    return this.purchaseService.addPurchase(payload);
  }
  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.ASSETS.DELETE_PURCHASE)
  deletePurchase(@Payload() payload: DeletePurchaseDto) {
    return this.purchaseService.deletePurchase(payload);
  }
  @MessagePattern({ cmd: RMQ_MESSAGES.AIR_SERVICES.ASSETS.UPDATE_PURCHASE })
  async updatePurchase(@Payload() payload: UpdatePurchaseDto) {
    return await this.purchaseService.updatePurchase(payload);
  }
}
