import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import { PrismaService } from '@shared/services';
import { OrganizationCompanyAccountService } from '../services/organization-company-account.service';

@Controller()
export class OrganizationCompanyAccountController {
  constructor(
    private prisma: PrismaService,
    private readonly OrganizationCompanyAccountService: OrganizationCompanyAccountService
  ) {}

  @MessagePattern({ cmd: RMQ_MESSAGES.ORGANIZATION_COMPANY_ACCOUNT.CREATE_ORGANIZATION_COMPANY_ACCOUNT })
  async createJob(@Payload() payload: any) {
    return await this.OrganizationCompanyAccountService.createOrganizationCompanyAccount(payload);
  }

  @MessagePattern({ cmd: RMQ_MESSAGES.ORGANIZATION_COMPANY_ACCOUNT.GET_ORGANIZATION_COMPANY_ACCOUNTS })
  async getOrganization(@Payload() payload: any) {
    return await this.OrganizationCompanyAccountService.getOrganizationCompanyAccounts(payload);
  }

}
