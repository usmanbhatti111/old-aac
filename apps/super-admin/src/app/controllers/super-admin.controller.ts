import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import { SuperAdminService } from '../services/super-admin.service';

@Controller()
export class SuperAdminController {
  constructor(private readonly superAdminService: SuperAdminService) {}

  @MessagePattern(RMQ_MESSAGES.SUPER_ADMIN.ADD_USER)
  addUser({ payload }) {
    return this.superAdminService.addUser(payload);
  }

  @MessagePattern(RMQ_MESSAGES.SUPER_ADMIN.USER_LIST)
  userList({ query }) {
    return this.superAdminService.userList(query);
  }

  @MessagePattern(RMQ_MESSAGES.SUPER_ADMIN.USER_PROFILE)
  userProfile({ userId }) {
    return this.superAdminService.userProfile(userId);
  }

  @MessagePattern(RMQ_MESSAGES.SUPER_ADMIN.UPDATE_PROFILE)
  updateUserProfile({ userId, payload }) {
    return this.superAdminService.updateProfile(userId, payload);
  }

  @MessagePattern(RMQ_MESSAGES.SUPER_ADMIN.ADD_ACCOUNTS)
  addAccounts({ payload }) {
    return this.superAdminService.addAccounts(payload);
  }

  @MessagePattern(RMQ_MESSAGES.SUPER_ADMIN.ACCOUNTS_LIST)
  accountList({ query }) {
    return this.superAdminService.accountList(query);
  }

  @MessagePattern(RMQ_MESSAGES.SUPER_ADMIN.UPDATE_ACCOUNTS)
  updateAccount({ userId, payload }) {
    return this.superAdminService.updateAccount(userId, payload);
  }
}
