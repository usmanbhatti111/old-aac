import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { MarketingCompanyService } from '../services/companies-services';

@Controller()
export class MarketingCompanyController {
  constructor(private readonly marketingCompany: MarketingCompanyService) {}

  @EventPattern('get-data')
  getData() {
    return this.marketingCompany.getData();
  }
}
