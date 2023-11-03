import { Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  API_ENDPOINTS,
  API_TAGS,
  CONTROLLERS,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';
import { firstValueFrom } from 'rxjs';
import { Auth } from '../../decorators/auth.decorator';

@ApiBearerAuth()
@ApiTags(API_TAGS.PERMISSIONS)
@Controller(CONTROLLERS.PERMISSIONS)
export class PermissionController {
  constructor(
    @Inject(SERVICES.SUPER_ADMIN)
    private superAdminService: ClientProxy
  ) {}

  @Auth(true)
  @Post(API_ENDPOINTS.PERMISSION.ADD_ALL_PERMISSIONS)
  public async addAllPermissions(): Promise<any> {
    const response = await firstValueFrom(
      this.superAdminService.send(
        RMQ_MESSAGES.PERMISSION.ADD_ALL_PERMISSIONS,
        {}
      )
    );

    return response;
  }
}
