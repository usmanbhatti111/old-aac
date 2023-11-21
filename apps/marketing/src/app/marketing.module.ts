import { Module } from '@nestjs/common';
import { SharedModule } from '@shared';

import { MarketingCompanyController } from './controller/companies-controller';
import { MarketingCompanyService } from './services/companies-services';

@Module({
  imports: [SharedModule],
  controllers: [MarketingCompanyController],
  providers: [MarketingCompanyService],
})
export class MarketingModule {}
