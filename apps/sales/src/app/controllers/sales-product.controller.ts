import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import {
  CreateSalesProductDto,
  DeleteSalesProductDto,
  UpdateSalesProductDto,
  GetSalesProductsDto,
  IdDto,
} from '@shared/dto';
import { SalesProductService } from '../services/sales-product.service';

@Controller()
export class SalesProductController {
  constructor(private readonly salesProductService: SalesProductService) {}

  @MessagePattern(RMQ_MESSAGES.SALES_PRODUCT.CREATE_SALES_PRODUCT)
  async addSalesProduct(@Payload() payload: CreateSalesProductDto) {
    return this.salesProductService.createSalesProduct(payload);
  }

  @MessagePattern(RMQ_MESSAGES.SALES_PRODUCT.GET_SALES_PRODUCTS)
  async getSalesProducts(@Payload() payload: GetSalesProductsDto) {
    return this.salesProductService.getSalesProducts(payload);
  }

  @MessagePattern(RMQ_MESSAGES.SALES_PRODUCT.GET_SALES_PRODUCT)
  async getSalesProduct(@Payload() payload: IdDto) {
    return this.salesProductService.getSalesProduct(payload);
  }

  @MessagePattern(RMQ_MESSAGES.SALES_PRODUCT.UPDATE_SALES_PRODUCT)
  async updateSalesProduct(@Payload() payload: UpdateSalesProductDto) {
    return this.salesProductService.updateSalesProduct(payload);
  }

  @MessagePattern(RMQ_MESSAGES.SALES_PRODUCT.DELETE_SALES_PRODUCT)
  async deleteSalesProduct(@Payload() payload: DeleteSalesProductDto) {
    return this.salesProductService.deleteSalesProduct(payload);
  }
}
