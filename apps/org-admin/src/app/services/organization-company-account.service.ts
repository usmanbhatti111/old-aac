import { HttpStatus, Injectable } from '@nestjs/common';
import { errorResponse, successResponse } from '@shared/constants';
import { OrganizationCompanyAccountRepository } from '@shared';
import mongoose from 'mongoose';
import {
  CreateOrganizationCompanyAccountDto,
  GetAllOrganizationCompanyAccountsDto,
  IdDto,
  UpdateOrganizationCompanyAccountDto,
  UpdateOrganizationCompanyAccountStatusDto,
} from '@shared/dto';
@Injectable()
export class OrganizationCompanyAccountService {
  constructor(
    private organizationCompanyAccountRepository: OrganizationCompanyAccountRepository
  ) {}

  notDeletedFilter = {
    isDeleted: false,
  };

  async createOrganizationCompanyAccount(
    payload: CreateOrganizationCompanyAccountDto
  ) {
    try {
      // Check if a company with the same name already exists
      const existingCompany =
        await this.organizationCompanyAccountRepository.find({
          accountName: payload?.accountName,
        });
      if (existingCompany.length > 0) {
        return errorResponse(
          HttpStatus.CONFLICT,
          'This company account already exist.'
        );
      }
      const res = await this.organizationCompanyAccountRepository.create({
        ...payload,
      });
      return successResponse(
        HttpStatus.OK,
        'Company account added successfully',
        {
          res,
        }
      );
    } catch (error) {
      return errorResponse(HttpStatus.BAD_REQUEST, error?.response?.message);
    }
  }

  async getOrganizationCompanyAccounts(
    payload: GetAllOrganizationCompanyAccountsDto
  ) {
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
        offset: skip,
        limit: perPage,
      });

      return successResponse(HttpStatus.OK, 'Success', res, {
        count: totalCount,
        page: page,
        limit: perPage,
      });
    } catch (error) {
      return errorResponse(HttpStatus.BAD_REQUEST, error?.meta?.message);
    }
  }

  async updateOrganizationCompanyAccount(payload: UpdateOrganizationCompanyAccountDto) {
    try {
      const { id } = payload;
      delete payload.id;
      // Check if another company with the same name already exists
      const existingCompany =
        await this.organizationCompanyAccountRepository.find({
          accountName: payload?.accountName,
          _id: { $ne: id }
        });
      if (existingCompany.length > 0) {
        return errorResponse(
          HttpStatus.CONFLICT,
          'This company account already exist.'
        );
      }
      const res = await this.organizationCompanyAccountRepository.findOneAndUpdate({_id:id},payload);
      return successResponse(
        HttpStatus.OK,
        'Company account updated successfully',
        {
          res,
        }
      );
    } catch (error) {
      return errorResponse(HttpStatus.BAD_REQUEST, error?.response?.message);
    }
  }

  async getOrganizationCompanyAccount(payload: IdDto) {
    try {
      const res = await this.organizationCompanyAccountRepository.findOne({
        _id: payload?.id,
      });
      return successResponse(HttpStatus.OK, 'Success', res);
    } catch (error) {
      return errorResponse(HttpStatus.BAD_REQUEST, error?.response?.message);
    }
  }
     
  async deleteOrganizationCompanyAccount(payload: IdDto) {
    try {
      await this.organizationCompanyAccountRepository.findOneAndUpdate({
        _id: payload?.id,
      },{isDeleted:true});
      return successResponse(HttpStatus.OK, 'Success', {});
    } catch (error) {
      return errorResponse(HttpStatus.BAD_REQUEST, error?.response?.message);
    }
  }

  async updateOrganizationCompanyAccountStatus(payload: UpdateOrganizationCompanyAccountStatusDto) {
    try {
     
      const res = await this.organizationCompanyAccountRepository.findOneAndUpdate(
        { _id: payload?.id },
        { isActive: payload?.isActive });
      return successResponse(HttpStatus.OK, 'Success', res);
    } catch (error) {
     
      return errorResponse(HttpStatus.BAD_REQUEST, error?.response?.message);
    }
  }
}
