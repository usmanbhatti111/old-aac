import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InvoiceRepository, OrganizationPlan, Products } from '@shared';
import { ResponseMessage, successResponse } from '@shared/constants';
import { AddDiscountDto, BillingDetailsDto } from '@shared/dto';
import mongoose from 'mongoose';

@Injectable()
export class BillingService {
  constructor(private invoiceRepository: InvoiceRepository) {}

  async billingDetails(payload: BillingDetailsDto) {
    try {
      const { id } = payload;
      const aggregatePipeline: any = [
        {
          $match: {
            organizationPlanId: new mongoose.Types.ObjectId(id),
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
        {
          $limit: 1,
        },
        {
          $lookup: {
            from: OrganizationPlan.name,
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
            from: Products.name,
            localField: 'productId',
            foreignField: '_id',
            as: 'product',
          },
        },
        {
          $project: {
            organizationPlanId: 1,
            productName: 1,
            planType: 1,
            planPrice: 1,
            billingCycle: 1,
            dueDate: 1,
            additionalUsers: 1,
            subTotal: 1,
            billingDate: '$organizationplans.billingDate',
          },
        },
      ];
      const response = await this.invoiceRepository.aggregate(
        aggregatePipeline
      );
      return successResponse(
        HttpStatus.OK,
        ResponseMessage.SUCCESS,
        response[0]
      );
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
