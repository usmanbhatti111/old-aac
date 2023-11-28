import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import { AddProductCatalogRequestDTO } from '@shared/dto';
import { ProductCatalogService } from '../../../services/settings/asset-management/product-catalog.service';
@Controller()
export class ProductCatalogController {
  constructor(private articleService: ProductCatalogService) {}

  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.SETTINGS.PRODUCT_CATALOG.ADD)
  addProductCatalog(@Payload() payload: AddProductCatalogRequestDTO) {
    return this.articleService.addProductCatalog(payload);
  }
}
