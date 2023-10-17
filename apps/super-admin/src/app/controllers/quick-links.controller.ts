import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import {
  AddQuickLinkDto,
  DeleteQuickLinksDto,
  EditQuickLinkDto,
  GetQuickLinksDto,
} from '@shared/dto';
import { QuickLinksService } from '../services/quick-links.service';

@Controller()
export class QuickLinksController {
  constructor(private readonly productsService: QuickLinksService) {}

  @MessagePattern(RMQ_MESSAGES.SUPER_ADMIN.QUICK_LINKS.ADD_QUICK_LINK)
  addProduct(@Payload() payload: AddQuickLinkDto) {
    return this.productsService.addQuickLink(payload);
  }

  @MessagePattern(RMQ_MESSAGES.SUPER_ADMIN.QUICK_LINKS.GET_QUICK_LINKS)
  getQuickLinks(@Payload() payload: GetQuickLinksDto) {
    return this.productsService.getQuickLinks(payload);
  }

  @MessagePattern(RMQ_MESSAGES.SUPER_ADMIN.QUICK_LINKS.DELETE_QUICK_LINKS)
  deleteQuickLinks(@Payload() payload: DeleteQuickLinksDto) {
    return this.productsService.deleteQuickLinks(payload);
  }

  @MessagePattern(RMQ_MESSAGES.SUPER_ADMIN.QUICK_LINKS.EDIT_QUICK_LINK)
  editQuickLinks(@Payload() payload: EditQuickLinkDto) {
    return this.productsService.editQuickLinks(payload);
  }

  @MessagePattern(
    RMQ_MESSAGES.SUPER_ADMIN.QUICK_LINKS.GET_QUICK_LINKS_GROUP_BY_PRODUCT
  )
  getQuickLinksGroupByProduct() {
    return this.productsService.getQuickLinksGroupByProduct();
  }
}
