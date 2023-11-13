import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import { PermissionService } from '../services/permission.service';

@Controller()
export class PermissionController {
  constructor(private readonly permssionService: PermissionService) {}

  @MessagePattern(RMQ_MESSAGES.PERMISSION.ADD_ALL_PERMISSIONS)
  addAllPermissions() {
    return this.permssionService.addAllPermissions();
  }

  @MessagePattern(RMQ_MESSAGES.PERMISSION.ADD_COMPNAY_ACCOUNT_ROLE)
  addCompanyAccountRole(payload) {
    return this.permssionService.addCompanyAccountRole(payload);
  }

  @MessagePattern(RMQ_MESSAGES.PERMISSION.GET_COMPNAY_ACCOUNT_ROLES)
  getCompanyAccountRoles(payload) {
    return this.permssionService.getCompanyAccountRoles(payload);
  }

  @MessagePattern(RMQ_MESSAGES.PERMISSION.EDIT_COMPANY_ACCOUNT_ROLE)
  updateCompanyAccountRoles(payload) {
    return this.permssionService.updateCompanyAccountRole(payload);
  }
}
