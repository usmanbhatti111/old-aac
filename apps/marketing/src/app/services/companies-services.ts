import { Get, Injectable } from '@nestjs/common';

@Injectable()
export class MarketingCompanyService {
  @Get()
  getData() {
    return 'Hello Marketing company Services';
  }
}
