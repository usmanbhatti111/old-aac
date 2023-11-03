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
}
