import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import {
  CreateOrgUserCompanyAccountDto,
  GetOrgEmployeeAccountsQueryDto,
} from '@shared/dto';
import { UserCompanyAccountService } from '../services/user-company-account.service';

@Controller()
export class UserCompanyAccountController {
  constructor(private userCompanyAccountService: UserCompanyAccountService) {}

  @MessagePattern(RMQ_MESSAGES.USER.CREATE_COMPANY_ACCOUNT)
  searchByName(@Payload() payload: CreateOrgUserCompanyAccountDto) {
    return this.userCompanyAccountService.createUserAccount(payload);
  }

  @MessagePattern(RMQ_MESSAGES.USER.GET_COMPANY_ACCOUNT)
  searchByCrn(@Payload() payload: GetOrgEmployeeAccountsQueryDto) {
    return this.userCompanyAccountService.getUserAccountList(payload);
  }
}
