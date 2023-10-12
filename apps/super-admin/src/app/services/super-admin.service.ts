import { HttpStatus, Injectable } from '@nestjs/common';
import { ResponseMessage, successResponse } from '@shared/constants';

import {
  AccountListDto,
  AddUserDto,
  GetCompanyListDto,
  GetUserDto,
  UpdateAccountDto,
  UpdateUserDto,
} from '@shared/dto';
import { UserAccountsRepository, UserORepository } from '@shared';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class SuperAdminService {
  constructor(
    private userRepository: UserORepository,
    private userAccountRepository: UserAccountsRepository
  ) {}

  async addUser(payload: AddUserDto) {
    try {
      const user = await this.userRepository.create(payload);
      return successResponse(HttpStatus.CREATED, ResponseMessage.SUCCESS, user);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async userList(query: GetUserDto) {
    try {
      const { search, products } = query;
      delete query.search;
      let filterQuery;
      if (search) {
        filterQuery = {
          $or: [
            {
              firstName: {
                $regex: search,
                $options: 'i',
              },
            },
            {
              lastName: {
                $regex: search,
                $options: 'i',
              },
            },
          ],
        };
      }
      const pipelines = [];
      if (products) {
        pipelines.push({
          $match: {
            products: { $elemMatch: { $type: products } },
          },
        });
      }
      const users = await this.userRepository.paginate({
        filterQuery,
        offset: 0,
        limit: 20,
        pipelines,
      });
      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, users);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async userProfile(userId: string) {
    try {
      const user = await this.userRepository.findOne({ _id: userId });

      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, user);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async updateProfile(userId, payload: UpdateUserDto) {
    try {
      const user = await this.userRepository.findByIdAndUpdate(userId, payload);
      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, user);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async addAccounts(payload: any) {
    try {
      const user = await this.userAccountRepository.create(payload);
      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, user);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async accountList(payload: AccountListDto) {
    try {
      const { search } = payload;
      const pipelines = [];

      if (search) {
        pipelines.push(
          {
            $lookup: {
              from: 'companies',
              localField: 'company',
              foreignField: '_id',
              as: 'company',
            },
          },
          {
            $lookup: {
              from: 'products',
              localField: 'products',
              foreignField: '_id',
              as: 'products',
            },
          },
          {
            $match: {
              'products.name': { $regex: search, $options: 'i' },
              'company.name': { $regex: search, $options: 'i' },
            },
          }
        );
      }

      const users = await this.userAccountRepository.paginate({
        offset: 0,
        limit: 1000,
        pipelines,
      });
      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, users);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async accountDetail(accountId: string) {
    try {
      const users = await this.userAccountRepository.findOne({
        _id: accountId,
      });
      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, users);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async updateAccount(userId, payload: UpdateAccountDto) {
    try {
      const user = await this.userAccountRepository.findByIdAndUpdate(
        userId,
        payload
      );
      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, user);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async companyListForDropDown(payload: GetCompanyListDto) {
    try {
      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, {
        msg: 'this endpoint will return company list',
        payload,
      });
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async productListForDropDown() {
    try {
      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, {
        msg: 'this endpoint will return product list',
      });
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
