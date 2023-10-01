import { Module } from '@nestjs/common';

import { OrganizationController } from './controllers/organization.controller';
import { OrganizationService } from './services/organization.service';
import { OrganizationCompanyAccountController } from './controllers/organization-company-account.controller';
import { OrganizationCompanyAccountService } from './services/organization-company-account.service';
import { OrganizationCompanyAccountProductService } from './services/organization-company-account-product.service';
import { SharedModule } from '@shared';


@Module({
  imports: [SharedModule],
  controllers: [OrganizationController, OrganizationCompanyAccountController],
  providers: [OrganizationService, OrganizationCompanyAccountService, OrganizationCompanyAccountProductService],
})
export class OrgAdminModule {}