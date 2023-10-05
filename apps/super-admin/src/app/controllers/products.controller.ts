import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import { AddProductDto, EditProductDto, GetProductsDto } from '@shared/dto';
import { ProductsService } from '../services/products.service';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern(RMQ_MESSAGES.PRODUCTS.ADD_PRODUCT)
  addProduct(@Payload() payload: AddProductDto) {
    return this.productsService.addProduct(payload);
  }

  @MessagePattern(RMQ_MESSAGES.PRODUCTS.GET_PRODUCTS)
  getProducts(@Payload() payload: GetProductsDto) {
    return this.productsService.getProducts(payload);
  }

  @MessagePattern(RMQ_MESSAGES.PRODUCTS.EDIT_PRODUCT)
  editProduct(@Payload() payload: EditProductDto) {
    return this.productsService.editProduct(payload);
  }
}
