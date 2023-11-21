import { HttpStatus, Injectable } from '@nestjs/common';
import { errorResponse, successResponse } from '@shared/constants';
import { OrganizationCompanyAccountRepository } from '@shared';

import {
  CreateOrganizationCompanyAccountDto,
  DeleteMultipleOrganizationCompanyAccountDto,
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
      const filterQuery = {
        isDeleted: false,
        organizationId: payload?.organizationId,
        accountName: { $regex: payload?.search, $options: 'i' },
      };

      let { limit, page } = payload;
      limit = limit ? limit : 10;
      page = page ? page : 1;
      const offset = limit * (page - 1);
      const pipelines: any = [
        {
          $lookup: {
            from: 'products',
            localField: 'products',
            foreignField: '_id',
            as: 'products',
          },
        },
      ];
      const res = await this.organizationCompanyAccountRepository.paginate({
        filterQuery,
        offset,
        limit,
        pipelines,
      });

      const response = successResponse(HttpStatus.OK, 'Success', res);

      return response;
    } catch (error) {
      return errorResponse(HttpStatus.BAD_REQUEST, error?.meta?.message);
    }
  }

  async updateOrganizationCompanyAccount(
    payload: UpdateOrganizationCompanyAccountDto
  ) {
    try {
      const { id } = payload;
      delete payload.id;
      // Check if another company with the same name already exists
      const existingCompany =
        await this.organizationCompanyAccountRepository.find({
          accountName: payload?.accountName,
          _id: { $ne: id },
        });
      if (existingCompany.length > 0) {
        return errorResponse(
          HttpStatus.CONFLICT,
          'This company account already exist.'
        );
      }
      const res =
        await this.organizationCompanyAccountRepository.findOneAndUpdate(
          { _id: id },
          payload
        );
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
      await this.organizationCompanyAccountRepository.findOneAndUpdate(
        {
          _id: payload?.id,
        },
        { isDeleted: true }
      );
      return successResponse(HttpStatus.OK, 'Success', {});
    } catch (error) {
      return errorResponse(HttpStatus.BAD_REQUEST, error?.response?.message);
    }
  }

  async deleteMultipleOrganizationCompanyAccount(
    payload: DeleteMultipleOrganizationCompanyAccountDto
  ) {
    try {
      const { accountIds, deletedBy } = payload;

      for (const accountId of accountIds) {
        await this.organizationCompanyAccountRepository.findOneAndUpdate(
          {
            _id: accountId,
          },
          { isDeleted: true, deletedAt: Date.now(), deletedBy }
        );
      }

      return successResponse(HttpStatus.OK, 'Success', {});
    } catch (error) {
      return errorResponse(HttpStatus.BAD_REQUEST, error?.response?.message);
    }
  }

  async updateOrganizationCompanyAccountStatus(
    payload: UpdateOrganizationCompanyAccountStatusDto
  ) {
    try {
      const res =
        await this.organizationCompanyAccountRepository.findOneAndUpdate(
          { _id: payload?.id },
          { isActive: payload?.isActive }
        );
      return successResponse(HttpStatus.OK, 'Success', res);
    } catch (error) {
      return errorResponse(HttpStatus.BAD_REQUEST, error?.response?.message);
    }
  }
}
