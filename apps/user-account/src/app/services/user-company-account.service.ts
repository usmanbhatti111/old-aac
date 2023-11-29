import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { UserCompanyAccountRepository } from '@shared';
import { ResponseMessage, successResponse } from '@shared/constants';
import {
  CreateOrgUserCompanyAccountDto,
  GetOrgEmployeeAccountsQueryDto,
} from '@shared/dto';

@Injectable()
export class UserCompanyAccountService {
  constructor(
    private userCompanyAccountRepository: UserCompanyAccountRepository
  ) {}

  async createUserAccount(payload: CreateOrgUserCompanyAccountDto) {
    try {
      const checkExisting = await this.userCompanyAccountRepository.find({
        user: payload?.user,
        company: payload?.company,
        product: payload?.product,
        organization: payload?.organization,
      });

      if (checkExisting.length > 0) {
        throw new ConflictException(
          'User Account already exists with this company and product'
        );
      }

      const res = await this.userCompanyAccountRepository.create({
        ...payload,
        isActive: false,
      });

      return successResponse(HttpStatus.CREATED, ResponseMessage.SUCCESS, res);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getUserAccountList(query: GetOrgEmployeeAccountsQueryDto) {
    const { search, page = 1, limit = 10 } = query;
    const offset = (page - 1) * limit;

    const pipelines = [
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $lookup: {
          from: 'organizationcompanyaccounts',
          localField: 'company',
          foreignField: '_id',
          as: 'company',
        },
      },
      {
        $lookup: {
          from: 'products',
          localField: 'product',
          foreignField: '_id',
          as: 'product',
        },
      },
      { $unwind: '$company' },
      { $unwind: '$product' },
      {
        $match: {
          $or: [
            {
              'user.firstName': {
                $regex: search || '',
                $options: 'i',
              },
            },
            {
              'user.lastName': {
                $regex: search || '',
                $options: 'i',
              },
            },
          ],
        },
      },
      {
        $project: {
          _id: 1,
          product: {
            _id: 1,
            logo: 1,
            name: 1,
          },
          company: {
            _id: 1,
            name: 1,
            email: 1,
          },
          status: 1,
        },
      },
    ];

    try {
      const res = await this.userCompanyAccountRepository.paginate({
        offset,
        limit,
        pipelines,
        ...query,
      });

      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, res);
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
