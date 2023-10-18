import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InvoiceRepository, OrganizationPlanRepository } from '@shared';
import { ResponseMessage, successResponse } from '@shared/constants';
import {
  AddDiscountDto,
  AssignOrgPlanDto,
  BillingDetailsDto,
  CreateInvoiceDto,
  ListOrgPlan,
  UpdateAssignOrgPlanSuperAdminDto,
} from '@shared/dto';
import mongoose from 'mongoose';

@Injectable()
export class InvoiceService {
  constructor(
    private invoiceRepository: InvoiceRepository,
    private orgPlanRepository: OrganizationPlanRepository
  ) {}

  async listOrgPlan(payload: ListOrgPlan) {
    try {
      const {
        page: offset = 0,
        limit = 10,
        search,
        organizationId,
        planTypeId,
        productId,
      } = payload;
      let filterQuery = {};

      if (search) {
        filterQuery = {
          $or: [{ 'organizations.name': { $regex: search, $options: 'i' } }],
        };
      }

      if (organizationId) {
        filterQuery['organizationId'] = new mongoose.Types.ObjectId(
          organizationId
        );
      }

      if (planTypeId) {
        filterQuery['plans.planTypeId'] = new mongoose.Types.ObjectId(
          planTypeId
        );
      }

      if (productId) {
        //logic implemented arrording to array only change in DTO (if array comes)
        const proId = [new mongoose.Types.ObjectId(productId)];
        filterQuery = { 'plans.planProducts': { $in: proId } };
      }

      const pipelines = [
        {
          $match: {
            isDeleted: false,
          },
        },
        {
          $lookup: {
            from: 'organizations',
            localField: 'organizationId',
            foreignField: '_id',
            as: 'organizations',
          },
        },
        {
          $addFields: {
            organizations: {
              $arrayElemAt: ['$organizations', 0],
            },
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
        {
          $match: filterQuery,
        },
      ];

      const params = {
        pipelines,
        offset,
        limit,
      };
      const result = await this.orgPlanRepository.paginate(params);

      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, result);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getOrgPlan(organizationPlanId) {
    try {
      const aggregatePipeline: any = [
        {
          $match: {
            _id: new mongoose.Types.ObjectId(organizationPlanId),
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'assignedBy',
            foreignField: '_id',
            as: 'assignedBy',
          },
        },
      ];
      const response = await this.orgPlanRepository.aggregate(
        aggregatePipeline
      );
      if (!response?.length) throw new NotFoundException();
      return successResponse(
        HttpStatus.OK,
        ResponseMessage.SUCCESS,
        response[0]
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async assignPlan(payload: AssignOrgPlanDto) {
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

  async updateAssignPlan(payload: UpdateAssignOrgPlanSuperAdminDto) {
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

  async generateInvoice(payload: CreateInvoiceDto) {
    try {
      const invoiceNo = 123; // TODO Generate unique invoice number
      const params: any = { ...payload, invoiceNo };
      const response = await this.invoiceRepository.create(params);
      return successResponse(
        HttpStatus.CREATED,
        ResponseMessage.CREATED,
        response
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async billingDetails(payload: BillingDetailsDto) {
    try {
      const { organizationPlanId } = payload;
      const pipeline: any = [
        {
          $match: {
            organizationPlanId: new mongoose.Types.ObjectId(organizationPlanId),
          },
        },
        {
          $lookup: {
            from: 'organizationplans',
            localField: 'organizationPlanId',
            foreignField: '_id',
            as: 'organizationplans',
          },
        },
        {
          $addFields: {
            organizationplans: {
              $arrayElemAt: ['$organizationplans', -1],
            },
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
          $addFields: {
            plans: {
              $arrayElemAt: ['$plans', -1],
            },
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
        {
          $limit: 10,
        },
      ];

      const response = await this.invoiceRepository.aggregate(pipeline);

      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, response);
    } catch (error) {
      throw new RpcException(error);
    }
  }
  async addDiscount(payload: AddDiscountDto) {
    try {
      const { id, invoiceDiscount } = payload;
      const filterQuery = {
        organizationPlanId: id,
      };
      const update = {
        invoiceDiscount: invoiceDiscount,
      };
      const response = await this.invoiceRepository.findOneAndUpdate(
        filterQuery,
        update
      );
      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, response);
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
