import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import { CompanyHouseService } from '../services/company-house.service';

@Controller()
export class CompanyHouseController {
  constructor(private readonly companyHouseService: CompanyHouseService) {}

  @MessagePattern(RMQ_MESSAGES.AUTHENTICATION.SEARCH_ORG_BY_NAME)
  searchByName(@Payload() payload: { name: string }) {
    return this.companyHouseService.searchCompanyByName(payload);
  }

  @MessagePattern(RMQ_MESSAGES.AUTHENTICATION.SEARCH_ORG_BY_CRN)
  searchByCrn(@Payload() payload: { crn: number }) {
    return this.companyHouseService.searchCompanyByCode(payload);
  }
}
