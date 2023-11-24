import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import { AssetTypeService } from '../../../services/settings/asset-management/asset-type.service';
import { AddAssetTypeDto, ListAssetTypeDto } from '@shared/dto';
@Controller()
export class AssetTypeController {
  constructor(private assettypeService: AssetTypeService) {}

  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.SETTINGS.ASSET_TYPE)
  public async addAssetType(@Payload() payload: AddAssetTypeDto) {
    return this.assettypeService.addAssetType(payload);
  }

  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.SETTINGS.ASSET_TYPE_LIST)
  public async getAssetTypeList(@Payload() payload: ListAssetTypeDto) {
    return this.assettypeService.getAssetTypeList(payload);
  }
}
