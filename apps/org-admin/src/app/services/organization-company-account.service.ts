import { Injectable } from '@nestjs/common';
import { errorResponse, successResponse } from '@shared/constants';
import { OrganizationCompanyAccountProductService } from './organization-company-account-product.service'
import { OrganizationCompanyAccountRepository } from '@shared';
@Injectable()
export class OrganizationCompanyAccountService {
  constructor(private organizationCompanyAccountRepository: OrganizationCompanyAccountRepository) { }

  notDeletedFilter = {
    isDeleted: false
  }

  async createOrganizationCompanyAccount(payload: any) {
    try {
      const { products, ...accountData } = payload; // Extract products from payload
      // Check if a company with the same name already exists
      const existingCompany = await this.organizationCompanyAccountRepository.findOne({
        where: {
          account_name: accountData.account_name,
        },
      });

      if (existingCompany) {
        return errorResponse(409, 'This company account already exist.');
      }
      const res = await this.organizationCompanyAccountRepository.create({
        ...accountData
      });
      const productPromises = products.map(async (productPayload) => {
        const product = await this.OrganizationCompanyAccountProductService.createProduct(productPayload, res.id);
        return product;
      });
      const createdProducts = await Promise.all(productPromises);
      return successResponse(200, 'Company account added successfully', {
        res,
        products: createdProducts
      });
    } catch (error) {
      return errorResponse(400, error?.meta?.message);
    }
  }

  async getOrganizationCompanyAccounts(payload: any) {
    try {
      const page = payload.page || 1; // Default to page 1 if not specified
      const perPage = payload.limit || 10; // Default to 10 items per page if not specified

      const skip = (page - 1) * perPage;

      // Get the total count of records (without pagination)
      const totalCount = await this.organizationCompanyAccountRepository.count({
        where: {
          organization_id: payload.organization_id,
        },
      });
      const res = await this.organizationCompanyAccountRepository.paginate({
        // {
        //   organization_id: payload.organization_id,
        // },
        // include: {
        //   products: true,
        // },
        offset:skip,
        limit:perPage,
    });

      return successResponse(200, 'Success', res, {
        count: totalCount,
        page: page,
        limit: perPage
      });
    } catch (error) {
      return errorResponse(400, error?.meta?.message);
    }
  }

}
