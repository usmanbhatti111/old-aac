import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { OrganizationPlanRepository, ProductsRepository } from '@shared';
import { ResponseMessage, successResponse } from '@shared/constants';
import {
  AssignOrgPlanOrgAdminDto,
  UpdateAssignOrgPlanOrgAdminDto,
} from '@shared/dto';
import mongoose from 'mongoose';

@Injectable()
export class SubscriptionService {
  constructor(
    private orgPlanRepository: OrganizationPlanRepository,
    private productRepository: ProductsRepository
  ) {}

  async getAllSubscriptions(payload) {
    try {
      const { organizationId } = payload;
      const pipelines = [
        {
          $match: {
            organizationId: new mongoose.Types.ObjectId(organizationId),
            status: 'ACTIVE',
            isDeleted: false,
          },
        },
        {
          $lookup: {
            from: 'plans',
            localField: 'planId',
            foreignField: '_id',
            as: 'plans',
          },
        },
        {
          $unwind: {
            path: '$plans',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: 'plantypes',
            localField: 'plans.planTypeId',
            foreignField: '_id',
            as: 'plantypes',
          },
        },
        {
          $unwind: {
            path: '$plantypes',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $addFields: {
            planProducts: '$plans.planProducts',
          },
        },
        {
          $lookup: {
            from: 'products',
            localField: 'planProducts',
            foreignField: '_id',
            as: 'planProducts',
          },
        },
        {
          $project: {
            'plans.planProductFeatures': 0,
            'plans.planProductModulePermissions': 0,
            'plans.createdAt': 0,
            'plans.updatedAt': 0,
            'planProducts.description': 0,
            'planProducts.isActive': 0,
            'planProducts.isDeleted': 0,
            'planProducts.logo': 0,
            'planProducts.modifiedBy': 0,
            'planProducts.createdAt': 0,
            'planProducts.updatedAt': 0,
            createdAt: 0,
            updatedAt: 0,
            isDeleted: 0,
            __v: 0,
          },
        },
      ];

      const organizationplans = await this.orgPlanRepository.aggregate(
        pipelines
      );
      const arrayIds = [];

      // Pushing unique plan IDs to the array
      organizationplans.forEach((organizationPlan) => {
        const { planProducts } = organizationPlan;
        planProducts.forEach((planProduct) => {
          if (!arrayIds.includes(planProduct)) {
            arrayIds.push(planProduct);
          }
        });
      });

      // Using the array in the find query to retrieve products not in the arrayIds
      const products = await this.productRepository.find({
        _id: { $nin: arrayIds },
      });
      const updatedProducts = products.map((product) => ({
        ...product,
        plan: 'Free',
        user: 1,
      }));
      const result = [...organizationplans, ...updatedProducts];

      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, result);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async assignPlan(payload: AssignOrgPlanOrgAdminDto) {
    try {
      const params: any = payload;
      const response = await this.orgPlanRepository.create(params);
      return successResponse(
        HttpStatus.CREATED,
        ResponseMessage.CREATED,
        response
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async updateAssignPlan(payload: UpdateAssignOrgPlanOrgAdminDto) {
    try {
      const { organizationPlanId } = payload;
      delete payload.organizationPlanId;

      const filterQuery = {
        _id: organizationPlanId,
        isDeleted: false,
      };

      const response = await this.orgPlanRepository.findOneAndUpdate(
        filterQuery,
        payload
      );

      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, response);
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
