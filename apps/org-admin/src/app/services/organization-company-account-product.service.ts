import { Injectable } from '@nestjs/common';
import { errorResponse, successResponse } from '@shared/constants';
import { PrismaService } from '@shared/services';

@Injectable()
export class OrganizationCompanyAccountProductService {
  constructor(private prisma: PrismaService) { }

  async createProduct(payload: any, organizationId: string) {

    try {

      // "product": "Marketing"
      const res = await this.prisma.organizationCompanyAccountProduct.create({
        data: {
          ...payload,
          organization_company_account_id: organizationId,
        }
      });
      return successResponse(200, 'Company account product added successfully', res);
    } catch (error) {
      console.log(error
      )
      return errorResponse(400, error?.meta?.message);
    }
  }
}
