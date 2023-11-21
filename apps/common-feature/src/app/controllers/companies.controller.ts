import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import {
  ChangeCompanyOwnerDto,
  CreateComapanyDTO,
  DeleteCompaniesDto,
  GetComapanyDto,
  GetCompanyDetailsDto,
  GetDeletedCompanisDto,
  UpdateComapanyDto,
} from '@shared/dto';
import { CompaniesService } from '../services/companies.services';

@Controller()
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @MessagePattern(RMQ_MESSAGES.COMMON_FEATURES.COMPANIES.DELETE_COMPANIES)
  async deleteCompanies(@Payload() payload: DeleteCompaniesDto) {
    return await this.companiesService.deleteCompanies(payload);
  }

  @MessagePattern(
    RMQ_MESSAGES.COMMON_FEATURES.COMPANIES.GET_UNIQUE_COMPANIES_OWNERS
  )
  async getUniqueCompaniesOwners() {
    return await this.companiesService.getUniqueCompaniesOwners();
  }

  @MessagePattern(RMQ_MESSAGES.COMMON_FEATURES.COMPANIES.CHANGE_COMPANY_OWNER)
  async changeCompanyOwner(@Payload() payload: ChangeCompanyOwnerDto) {
    return await this.companiesService.changeCompanyOwner(payload);
  }

  @MessagePattern(RMQ_MESSAGES.COMMON_FEATURES.COMPANIES.GET_COMPANY_DETIALS)
  async getCompanyDetails(@Payload() payload: GetCompanyDetailsDto) {
    return await this.companiesService.getCompanyDetails(payload);
  }
  // nome

  @EventPattern(RMQ_MESSAGES.COMPANY.CREATE)
  create(@Payload() payload: CreateComapanyDTO) {
    return this.companiesService.create(payload);
  }

  @MessagePattern(RMQ_MESSAGES.COMPANY.GET)
  list(@Payload() paylaod: GetComapanyDto) {
    return this.companiesService.list(paylaod);
  }

  @MessagePattern(RMQ_MESSAGES.COMPANY.DETAIL)
  detail(@Payload() Payload: string) {
    return this.companiesService.detail(Payload);
  }

  @MessagePattern(RMQ_MESSAGES.COMPANY.UPDATE)
  upate(@Payload() payload: UpdateComapanyDto) {
    return this.companiesService.update(payload);
  }

  @MessagePattern(RMQ_MESSAGES.COMPANY.DELETE)
  delete(@Payload() payload: { ids: string[]; deletedById: string }) {
    return this.companiesService.delete(payload);
  }

  @MessagePattern(RMQ_MESSAGES.COMPANY.GET_DELETED)
  deletedComapany(@Payload() paylaod: GetDeletedCompanisDto) {
    return this.companiesService.deletedCompanies(paylaod);
  }
}
