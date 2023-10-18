import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import {
  AddProductCategoryDto,
  EditProductCategoryDto,
  GetProductCategoriesDto,
} from '@shared/dto';
import { ProductCategoriesService } from '../services/product-categories.service';

@Controller()
export class ProductCategoriesController {
  constructor(
    private readonly productCategoriesService: ProductCategoriesService
  ) {}

  @MessagePattern(
    RMQ_MESSAGES.ORG_ADMIN.PRODUCT_CATEGORIES.ADD_PRODUCT_CATEGORY
  )
  addProductCategory(@Payload() payload: AddProductCategoryDto) {
    return this.productCategoriesService.addProductCategory(payload);
  }

  @MessagePattern(
    RMQ_MESSAGES.ORG_ADMIN.PRODUCT_CATEGORIES.GET_PRODUCT_CATEGORIES
  )
  getProductCategories(@Payload() payload: GetProductCategoriesDto) {
    return this.productCategoriesService.getProductCategories(payload);
  }

  @MessagePattern(
    RMQ_MESSAGES.ORG_ADMIN.PRODUCT_CATEGORIES.EDIT_PRODUCT_CATEGORY
  )
  editProductCategory(@Payload() payload: EditProductCategoryDto) {
    return this.productCategoriesService.editProductCategory(payload);
  }
}
