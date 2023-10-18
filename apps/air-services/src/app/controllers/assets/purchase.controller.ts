import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import {
  addPurchaseOrderDto,
  DeletePurchaseOrderDto,
  UpdatePurchaseOrderDto,
  FilterPurchaseOrderDto,
  IdDTO,
} from '@shared/dto';
import { PurchaseOrderService } from '../../services/assets/purchase.service';

@Controller()
export class PurchaseOrderController {
  constructor(private readonly purchaseService: PurchaseOrderService) {}

  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.ASSETS.ADD_PURCHASEORDER)
  async addPurchaseOrder(@Payload() payload: addPurchaseOrderDto) {
    return await this.purchaseService.addPurchaseOrder(payload);
  }

  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.ASSETS.DELETE_PURCHASEORDER)
  deletePurchase(@Payload() payload: DeletePurchaseOrderDto) {
    return this.purchaseService.deletePurchaseOrder(payload);
  }
  @MessagePattern({
    cmd: RMQ_MESSAGES.AIR_SERVICES.ASSETS.UPDATE_PURCHASEORDER,
  })
  async updatePurchase(@Payload() payload: UpdatePurchaseOrderDto) {
    return await this.purchaseService.updatePurchaseOrder(payload);
  }

  @MessagePattern({ cmd: RMQ_MESSAGES.AIR_SERVICES.ASSETS.GET_PURCHASEORDER })
  async getPurchase(@Payload() payload: IdDTO) {
    return await this.purchaseService.getPurchaseOrder(payload);
  }
  @MessagePattern({
    cmd: RMQ_MESSAGES.AIR_SERVICES.ASSETS.GET_PURCHASEORDERLIST,
  })
  async getPurchases(@Payload() payload: FilterPurchaseOrderDto) {
    return await this.purchaseService.getPurchaseOrderList(payload);
  }
}
