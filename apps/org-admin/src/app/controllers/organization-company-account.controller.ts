import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import { OrganizationCompanyAccountService } from '../services/organization-company-account.service';
import {
  CreateOrganizationCompanyAccountDto,
  DeleteMultipleOrganizationCompanyAccountDto,
  DeleteOrganizationCompanyAccountDto,
  GetAllOrganizationCompanyAccountsDto,
  IdDto,
  UpdateOrganizationCompanyAccountDto,
  UpdateOrganizationCompanyAccountStatusDto,
} from '@shared/dto';

@Controller()
export class OrganizationCompanyAccountController {
  constructor(
    private readonly OrganizationCompanyAccountService: OrganizationCompanyAccountService
  ) {}

  @MessagePattern({
    cmd: RMQ_MESSAGES.ORGANIZATION_COMPANY_ACCOUNT
      .CREATE_ORGANIZATION_COMPANY_ACCOUNT,
  })
  async createOrganizationAccount(
    @Payload() payload: CreateOrganizationCompanyAccountDto
  ) {
    return await this.OrganizationCompanyAccountService.createOrganizationCompanyAccount(
      payload
    );
  }

  @MessagePattern({
    cmd: RMQ_MESSAGES.ORGANIZATION_COMPANY_ACCOUNT
      .GET_ORGANIZATION_COMPANY_ACCOUNTS,
  })
  async getOrganizationAccounts(
    @Payload() payload: GetAllOrganizationCompanyAccountsDto
  ) {
    return await this.OrganizationCompanyAccountService.getOrganizationCompanyAccounts(
      payload
    );
  }

  @MessagePattern({
    cmd: RMQ_MESSAGES.ORGANIZATION_COMPANY_ACCOUNT
      .GET_ORGANIZATION_COMPANY_ACCOUNT,
  })
  async getOrganizationAccount(@Payload() payload: IdDto) {
    return await this.OrganizationCompanyAccountService.getOrganizationCompanyAccount(
      payload
    );
  }

  @MessagePattern({
    cmd: RMQ_MESSAGES.ORGANIZATION_COMPANY_ACCOUNT
      .UPDATE_ORGANIZATION_COMPANY_ACCOUNT,
  })
  async updateOrganizationAccount(
    @Payload() payload: UpdateOrganizationCompanyAccountDto
  ) {
    return await this.OrganizationCompanyAccountService.updateOrganizationCompanyAccount(
      payload
    );
  }

  @MessagePattern({
    cmd: RMQ_MESSAGES.ORGANIZATION_COMPANY_ACCOUNT
      .DELETE_ORGANIZATION_COMPANY_ACCOUNT,
  })
  async deleteOrganizationAccount(
    @Payload() payload: DeleteOrganizationCompanyAccountDto
  ) {
    return await this.OrganizationCompanyAccountService.deleteOrganizationCompanyAccount(
      payload
    );
  }

  @MessagePattern({
    cmd: RMQ_MESSAGES.ORGANIZATION_COMPANY_ACCOUNT
      .DELETE_MULTIPLE_ORGANIZATION_COMPANY_ACCOUNT,
  })
  async deleteMultipleOrganizationAccount(
    @Payload() payload: DeleteMultipleOrganizationCompanyAccountDto
  ) {
    return await this.OrganizationCompanyAccountService.deleteMultipleOrganizationCompanyAccount(
      payload
    );
  }

  @MessagePattern({
    cmd: RMQ_MESSAGES.ORGANIZATION_COMPANY_ACCOUNT
      .UPDATE_ORGANIZATION_COMPANY_ACCOUNT_STATUS,
  })
  async updateOrganizationAccountStatus(
    @Payload() payload: UpdateOrganizationCompanyAccountStatusDto
  ) {
    return await this.OrganizationCompanyAccountService.updateOrganizationCompanyAccountStatus(
      payload
    );
  }
}
