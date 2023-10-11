import { Controller } from '@nestjs/common';
import { RMQ_MESSAGES } from '@shared/constants';
import { ProductFeaturesService } from '../services/product-features.service';
import {
  AddProductFeatureDto,
  EditProductFeatureDto,
  GetProductsFeaturesDto,
  IdDto,
  IdsDto,
} from '@shared/dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class ProductFeaturesController {
  constructor(
    private readonly productFeaturesService: ProductFeaturesService
  ) {}

  @MessagePattern(RMQ_MESSAGES.PRODUCT_FEATURES.ADD_PRODUCT_FEATURE)
  addProductFeature(@Payload() payload: AddProductFeatureDto) {
    return this.productFeaturesService.addProductFeature(payload);
  }

  @MessagePattern(RMQ_MESSAGES.PRODUCT_FEATURES.GET_PRODUCTS_FEATURES)
  getProductsFeatures(@Payload() payload: GetProductsFeaturesDto) {
    return this.productFeaturesService.getProductsFeatures(payload);
  }

  @MessagePattern(RMQ_MESSAGES.PRODUCT_FEATURES.GET_PRODUCT_FEATURE)
  getProductFeature(@Payload() payload: IdDto) {
    return this.productFeaturesService.getProductFeature(payload);
  }

  @MessagePattern(RMQ_MESSAGES.PRODUCT_FEATURES.EDIT_PRODUCT_FEATURE)
  editProductFeature(@Payload() payload: EditProductFeatureDto) {
    return this.productFeaturesService.editProductFeature(payload);
  }

  @MessagePattern(RMQ_MESSAGES.PRODUCT_FEATURES.DELETE_PRODUCTS_FEATURES)
  deleteProductFeature(@Payload() payload: IdsDto) {
    return this.productFeaturesService.deleteProductFeature(payload);
  }
}
