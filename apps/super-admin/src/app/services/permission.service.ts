import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PermissionRepository, CompanyAccountRoleRepository } from '@shared';
import { ResponseMessage, successResponse } from '@shared/constants';

import * as fs from 'fs';
import mongoose from 'mongoose';

@Injectable()
export class PermissionService {
  constructor(
    private permissionRepository: PermissionRepository,
    private companyAccountRoleRepository: CompanyAccountRoleRepository
  ) {}

  notDeletedFilter = {
    isDeleted: false,
  };

  async addAllPermissions() {
    try {
      const res = await this.permissionRepository.find();

      if (res && res[0])
        throw new BadRequestException(`Permissions already added.`);

      const permissiosJson = `${process.cwd()}/rolesAndRights.json`;
      const allPermissions = JSON.parse(
        fs.readFileSync(permissiosJson, 'utf8')
      );

      let permissionModule = '';
      let permissionSubModule = '';
      let permissionProduct = '';
      for (const permission of allPermissions) {
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

        await this.permissionRepository.create({
          module: permissionModule,
          subModule: permissionSubModule
            ? permissionSubModule
            : permissionModule,
          product: permissionProduct,
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

  async addCompanyAccountRole(payload: any) {
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

  async getCompanyAccountRoles(payload: any) {
    try {
      const { limit, page, search, organizationCompanyAccountId } = payload;
      const offset = limit * (page - 1);
      delete payload.page;
      delete payload.limit;
      delete payload.search;

      const pipelines = [];

      pipelines.push({
        $match: {
          organizationCompanyAccountId: new mongoose.Types.ObjectId(
            organizationCompanyAccountId
          ),
        },
      });

      let searchFilter;
      if (search) {
        searchFilter = {
          name: {
            $regex: search,
            $options: 'i',
          },
        };
      }

      const filterQuery = {
        ...searchFilter,
      };

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
            from: 'permissions',
            localField: 'tempPermissions',
            foreignField: 'slug',
            as: 'permissions',
          },
        },
        {
          $project: {
            _id: 0,
            name: 1,
            organizationId: 1,
            organizationCompanyAccountId: 1,
            createdAt: 1,
            updatedAt: 1,
            permissions: 1,
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

  async updateCompanyAccountRole(payload: any) {
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

  // async getCompanyAccountRoles(payload: any) {
  //   try {

  //     const { limit, page, search,organizationCompanyAccountId} = payload;

  //     const filterQuery = {};
  //     const searchFilter = {};

  //     if (search) {
  //       searchFilter['$or'] = [
  //         { name: { $regex: search, $options: 'i' } },
  //         { contractNumber: { $regex: search, $options: 'i' } },
  //         { status: { $regex: search, $options: 'i' } },
  //         { cost: { $regex: search, $options: 'i' } },
  //       ];
  //       pipeline.push({ $match: searchFilter });
  //     }

  //     const offset = limit * (page - 1);
  //     const filterQuery = {};
  //     const pipeline: any = [];

  //     if (search) {
  //       pipeline.push({
  //         $match: {
  //           name: { $regex: search, $options: 'i' },
  //         },
  //       });
  //     }
  //     const res = await this.dashboardRepository.paginate({
  //       filterQuery,
  //       offset,
  //       limit,
  //       pipelines: pipeline,
  //     });

  //   const pipelines= [
  //       {
  //         $match: {
  //           organizationCompanyAccountId: new mongoose.Types.ObjectId(payload.organizationCompanyAccountId),
  //         },
  //       },
  //       {
  //         $lookup: {
  //           from: 'permissions',
  //           localField: 'permissions',
  //           foreignField: 'slug',
  //           as: 'populatedPermissions',
  //         },
  //       },
  //     ]
  //     const data = await this.companyAccountRoleRepository.aggregate(pipelines)

  //     const paginateRes = await this.companyAccountRoleRepository.paginate({
  //       filterQuery: {},
  //       pipelines,
  //     });

  //     if (data[0]) {
  //       return successResponse(HttpStatus.OK, 'Plan Get Successfully', data);
  //     } else {
  //       return errorResponse(
  //         HttpStatus.BAD_REQUEST,
  //         ResponseMessage.NOT_FOUND,
  //         []
  //       );
  //     }
  //   } catch (error) {
  //     throw new RpcException(error);
  //   }
  // }
}

// async getDashboardList(payload: ListDashboardDTO) {
//   try {
//     const { limit, page, search } = payload;
//     const offset = limit * (page - 1);
//     const filterQuery = {};
//     const pipeline: any = [];

//     if (search) {
//       pipeline.push({
//         $match: {
//           name: { $regex: search, $options: 'i' },
//         },
//       });
//     }
//     const res = await this.dashboardRepository.paginate({
//       filterQuery,
//       offset,
//       limit,
//       pipelines: pipeline,
//     });
//     return res;
//   } catch (error) {
//     return new RpcException(error);
//   }
// }
