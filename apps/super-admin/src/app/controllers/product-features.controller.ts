import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import {
  AddProductFeatureDto,
  DeleteProductFeaturesDto,
  EditProductFeatureDto,
  GetProductsFeaturesDto,
  IdDto,
} from '@shared/dto';
import { ProductFeaturesService } from '../services/product-features.service';

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
  deleteProductFeature(@Payload() payload: DeleteProductFeaturesDto) {
    return this.productFeaturesService.deleteProductFeature(payload);
  }
}
