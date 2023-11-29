import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import {
  PermissionRepository,
  CompanyAccountRoleRepository,
  ProductsRepository,
} from '@shared';
import { ResponseMessage, successResponse } from '@shared/constants';
import {
  AddCompanyAccountRoleDto,
  EditCompanyAccountRoleDto,
  GetCompanyAccountRolesDto,
  PlanProductParamDto,
} from '@shared/dto';

import * as fs from 'fs';
import dayjs from 'dayjs';

@Injectable()
export class PermissionService {
  constructor(
    private permissionRepository: PermissionRepository,
    private companyAccountRoleRepository: CompanyAccountRoleRepository,
    private productsRepository: ProductsRepository
  ) {}

  notDeletedFilter = {
    isDeleted: false,
  };

  async addAllPermissions() {
    try {
      const res = await this.permissionRepository.find();
      const permissiosJson = `${process.cwd()}/rolesAndRights.json`;
      const allPermissions = JSON.parse(
        fs.readFileSync(permissiosJson, 'utf8')
      );

      let permissionModule = '';
      let permissionSubModule = '';
      let permissionProduct: any = '';
      for (const permission of allPermissions) {
        const res = await this.permissionRepository.findOneWithoutException({
          slug: permission['Slugs'],
        });
        if (res) await this.permissionRepository.delete({ _id: res?._id });

        if (permission['Modules']) permissionModule = permission['Modules'];

        if (permission['Sub Modules'])
          permissionSubModule = permission['Sub Modules'];

        if (
          !permission['Sub Modules'] &&
          !permission['Slugs'] &&
          !permission['Permissions'] &&
          permission['Modules']
        ) {
          permissionProduct = permission['Modules'];
          continue;
        }

        const allProducts = await this.productsRepository.find();

        for (const product of allProducts) {
          if (permissionProduct == product?.name)
            permissionProduct = product?._id;
        }

        await this.permissionRepository.create({
          module: permissionModule,
          subModule: permissionSubModule
            ? permissionSubModule
            : permissionModule,
          productId: permissionProduct,
          slug: permission['Slugs'],
          name: permission['Permissions'],
        });
      }

      const response = successResponse(
        HttpStatus.CREATED,
        ResponseMessage.SUCCESS,
        res
      );
      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getPermissionsByProduct(payload: PlanProductParamDto) {
    try {
      const permissions = await this.permissionRepository.find({
        productId: payload?.productId,
      });

      const response = successResponse(
        HttpStatus.FOUND,
        ResponseMessage.SUCCESS,
        permissions
      );
      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async addCompanyAccountRole(payload: AddCompanyAccountRoleDto) {
    try {
      const res = await this.companyAccountRoleRepository.create(payload);

      const response = successResponse(
        HttpStatus.CREATED,
        ResponseMessage.SUCCESS,
        res
      );
      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getCompanyAccountRoles(payload: GetCompanyAccountRolesDto) {
    try {
      const {
        limit,
        page,
        search,
        status,
        dateStart,
        dateEnd,
        productId,
        organizationCompanyAccountId,
      } = payload;
      const offset = limit * (page - 1);
      delete payload.page;
      delete payload.limit;
      delete payload.search;

      const pipelines = [];
      const filterQuery = { isDeleted: false };

      filterQuery['organizationCompanyAccountId'] =
        organizationCompanyAccountId;

      if (dateStart && dateEnd) {
        const startDate = dayjs(dateStart).startOf('day').toDate();
        const endDate = dayjs(dateEnd).endOf('day').toDate();

        filterQuery['createdAt'] = {
          $gte: startDate,
          $lte: endDate,
        };
      }

      if (productId) {
        filterQuery['productId'] = productId;
      }

      if (status) {
        filterQuery['status'] = status;
      }

      if (search) {
        filterQuery['$or'] = [
          {
            name: { $regex: search, $options: 'i' },
          },
        ];
      }
      pipelines.push(
        {
          $addFields: {
            tempPermissions: '$permissions',
          },
        },
        {
          $project: {
            permissions: 0,
          },
        },
        {
          $lookup: {
            from: 'organizationcompanyaccounts',
            localField: 'organizationCompanyAccountId',
            foreignField: '_id',
            as: 'companyAccountDetails',
          },
        },
        {
          $unwind: '$companyAccountDetails',
        },
        {
          $lookup: {
            from: 'products',
            localField: 'productId',
            foreignField: '_id',
            as: 'productDetails',
          },
        },
        {
          $unwind: '$productDetails',
        },
        {
          $lookup: {
            from: 'permissions',
            localField: 'tempPermissions',
            foreignField: 'slug',
            as: 'permissions',
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            description: 1,
            organizationId: 1,
            organizationCompanyAccountId: 1,
            createdAt: 1,
            updatedAt: 1,
            permissions: 1,
            status: 1,
            companyAccountDetails: {
              id: '$companyAccountDetails._id',
              name: '$companyAccountDetails.name',
            },
            productDetails: {
              id: '$productDetails._id',
              name: '$productDetails.name',
            },
          },
        }
      );

      const res = await this.companyAccountRoleRepository.paginate({
        filterQuery,
        offset,
        limit,
        pipelines,
      });

      const response = successResponse(
        HttpStatus.OK,
        ResponseMessage.SUCCESS,
        res
      );

      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async updateCompanyAccountRole(payload: EditCompanyAccountRoleDto) {
    try {
      const filter = { _id: payload?.companyAccountRoleId };
      delete payload.companyAccountRoleId;
      const res = await this.companyAccountRoleRepository.findByIdAndUpdate(
        filter,
        payload
      );

      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, res);
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
