import { Injectable } from '@nestjs/common';
import { errorResponse, successResponse } from '@shared/constants';
import { OrganizationCompanyAccountRepository } from '@shared';
import mongoose from 'mongoose';
import { CreateOrganizationCompanyAccountDto, GetAllOrganizationCompanyAccountsDto, IdDto } from '@shared/dto';
@Injectable()
export class OrganizationCompanyAccountService {
  constructor(private organizationCompanyAccountRepository: OrganizationCompanyAccountRepository) { }

  notDeletedFilter = {
    isDeleted: false
  }

  async createOrganizationCompanyAccount(payload: CreateOrganizationCompanyAccountDto) {
    try {

      // Check if a company with the same name already exists
      const existingCompany = await this.organizationCompanyAccountRepository.find({
        accountName: payload?.accountName,
      });
      if (existingCompany.length>0) {
        return errorResponse(409, 'This company account already exist.');
      }
      const res = await this.organizationCompanyAccountRepository.create({
        ...payload
      });
      return successResponse(200, 'Company account added successfully', {
        res,
      });
    } catch (error) {
      return errorResponse(400, error?.response?.message);
    }
  }

  async getOrganizationCompanyAccounts(payload: GetAllOrganizationCompanyAccountsDto) {
    try {

      const page = payload?.page || 1; // Default to page 1 if not specified
      const perPage = payload?.limit || 10; // Default to 10 items per page if not specified

      const skip = (page - 1) * perPage;

      // Get the total count of records (without pagination)
      const totalCount = await this.organizationCompanyAccountRepository.count({
          organizationId: payload?.organizationId,
      });
     
      const res = await this.organizationCompanyAccountRepository.paginate({
        filterQuery: {
            organizationId: new mongoose.Types.ObjectId(payload?.organizationId),
        },
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

  async getOrganizationCompanyAccount(payload: IdDto) {
    try {
      const res = await this.organizationCompanyAccountRepository.findOne({
          _id: payload?.id,
      });
      return successResponse(200, 'Success', res);
    } catch (error) {
      return errorResponse(400, error?.response?.message);
    }
  }

}
