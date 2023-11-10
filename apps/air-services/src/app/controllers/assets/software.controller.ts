import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import {
  AllocateSoftwareContractDto,
  AssetsSoftwareAssignDto,
  AssetsSoftwareDto,
  GetAssetsSoftwareDetails,
  GetSoftwareUserDto,
  IdDto,
  PaginationDto,
  SoftwareUsersDto,
} from '@shared/dto';

import { SoftwareService } from '../../services/assets/software.service';

@Controller()
export class SoftwareController {
  constructor(private softwareService: SoftwareService) {}

  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.ASSETS.ADD_SOFTWARE)
  addSoftware(@Payload() payload: AssetsSoftwareDto) {
    return this.softwareService.addSoftware(payload);
  }
  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.ASSETS.EDIT_SOFTWARE)
  editSoftware(@Payload() payload: { id: IdDto; dto: AssetsSoftwareDto }) {
    return this.softwareService.editSoftware(payload);
  }
  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.ASSETS.DELETE_SOFTWARE)
  deleteSoftware(@Payload() payload: { id: IdDto }) {
    return this.softwareService.deleteSoftware(payload);
  }
  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.ASSETS.GET_SOFTWARE)
  getSoftware(
    @Payload()
    payload: {
      dto: GetAssetsSoftwareDetails;
      pagination: PaginationDto;
    }
  ) {
    return this.softwareService.getSoftware(payload);
  }

  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.ASSETS.ASSIGN_CATEGORY)
  assignCatToSoftware(@Payload() payload: AssetsSoftwareAssignDto) {
    return this.softwareService.assignCatToSoftware(payload);
  }
  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.ASSETS.ADD_SOFTWARE_USERS)
  addSoftwareUsers(
    @Payload() payload: { dto: SoftwareUsersDto; userId: string }
  ) {
    return this.softwareService.addSoftwareUsers(payload);
  }
  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.ASSETS.SOFTWARE_USERS_DETAILS)
  getSoftwareUsers(
    @Payload() payload: { id: IdDto; userId: string; dto: GetSoftwareUserDto }
  ) {
    return this.softwareService.getSoftwareUsers(payload);
  }
  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.ASSETS.SOFTWARE_ALLOCATE_CONTRACT)
  allocateSoftwareContract(
    @Payload() payload: { dto: AllocateSoftwareContractDto; userId: string }
  ) {
    return this.softwareService.allocateSoftwareContract(payload);
  }
  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.ASSETS.SOFTWARE_DEALLOCATE_CONTRACT)
  deAllocateSoftwareContract(
    @Payload() payload: { dto: AllocateSoftwareContractDto; userId: string }
  ) {
    return this.softwareService.deAllocateSoftwareContract(payload);
  }
  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.ASSETS.SOFTWARE_USERS_REMOVE)
  async softwareUsersRemove(@Payload() payload: { id: IdDto }) {
    return this.softwareService.softwareUserRemove(payload);
  }
}
