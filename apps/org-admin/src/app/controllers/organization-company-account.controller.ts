import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import { OrganizationCompanyAccountService } from '../services/organization-company-account.service';
import { CreateOrganizationCompanyAccountDto, GetAllOrganizationCompanyAccountsDto } from '@shared/dto';

@Controller()
export class OrganizationCompanyAccountController {
  constructor(
    private readonly OrganizationCompanyAccountService: OrganizationCompanyAccountService
  ) {}

  @MessagePattern({ cmd: RMQ_MESSAGES.ORGANIZATION_COMPANY_ACCOUNT.CREATE_ORGANIZATION_COMPANY_ACCOUNT })
  async createOrganizationAccount(@Payload() payload: CreateOrganizationCompanyAccountDto) {
    return await this.OrganizationCompanyAccountService.createOrganizationCompanyAccount(payload);
  }

  @MessagePattern({ cmd: RMQ_MESSAGES.ORGANIZATION_COMPANY_ACCOUNT.GET_ORGANIZATION_COMPANY_ACCOUNTS })
  async getOrganizationAccounts(@Payload() payload: GetAllOrganizationCompanyAccountsDto) {
    return await this.OrganizationCompanyAccountService.getOrganizationCompanyAccounts(payload);
  }

}
