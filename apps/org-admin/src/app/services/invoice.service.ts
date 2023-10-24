import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import {
  InvoiceRepository,
  OrganizationPlanRepository,
  PaymentRepository,
} from '@shared';
import {
  BillingCycleEnum,
  InvoiceStatusEnum,
  ResponseMessage,
  successResponse,
} from '@shared/constants';
import { GetAllInvoicesDto, GetInvoiceDto, PayNowDto } from '@shared/dto';
import mongoose from 'mongoose';

@Injectable()
export class InvoiceService {
  constructor(
    private invoiceRepository: InvoiceRepository,
    private paymentRepository: PaymentRepository,
    private OrgPlanRepository: OrganizationPlanRepository
  ) {}

  async getAllInvoices(payload: GetAllInvoicesDto) {
    try {
      const { page = 0, limit = 10, organizationId, search, status } = payload;
      let filterQuery = {};
      const offset = (page - 1) * limit;

      if (search) {
        filterQuery = {
          $or: [{ 'organizations.name': { $regex: search, $options: 'i' } }],
        };
      }

      if (status) {
        filterQuery = {
          $or: [{ status: { $regex: status, $options: 'i' } }],
        };
      }

      const pipelines = [
        {
          $match: {
            organizationId: new mongoose.Types.ObjectId(organizationId),
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
            as: 'plans',
            let: { planId: '$planId' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ['$_id', '$$planId'],
                  },
                },
              },
              {
                $project: {
                  description: 1,
                },
              },
            ],
          },
        },
        {
          $addFields: {
            plans: {
              $arrayElemAt: ['$plans', 0],
            },
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
          $addFields: {
            plantypes: {
              $arrayElemAt: ['$plantypes.name', 0],
            },
          },
        },
        {
          $project: {
            'details.organizations': 0,
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
      const result = await this.invoiceRepository.paginate(params);

      const pipeline = [
        {
          $match: {
            organizationId: new mongoose.Types.ObjectId(organizationId),
            isDeleted: false,
            status: InvoiceStatusEnum.OVERDUE,
          },
        },
        {
          $group: {
            _id: null,
            countInvoiceDue: {
              $sum: 1,
            },
            totalAmountDue: {
              $sum: '$total',
            },
          },
        },
      ];
      const widgets = await this.invoiceRepository.aggregate(pipeline);
      const response = {
        ...result,
        widget: widgets[0],
      };

      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, response);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getOneInvoice(payload: GetInvoiceDto) {
    try {
      const { invoiceId, organizationId } = payload;
      const pipelines = [
        {
          $match: {
            _id: new mongoose.Types.ObjectId(invoiceId),
            organizationId: new mongoose.Types.ObjectId(organizationId),
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
            as: 'plans',
            let: { planId: '$planId' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ['$_id', '$$planId'],
                  },
                },
              },
              {
                $project: {
                  description: 1,
                },
              },
            ],
          },
        },
        {
          $addFields: {
            plans: {
              $arrayElemAt: ['$plans', 0],
            },
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
          $addFields: {
            plantypes: {
              $arrayElemAt: ['$plantypes.name', 0],
            },
          },
        },
        {
          $project: {
            'details.organizations': 0,
          },
        },
      ];

      const response = await this.invoiceRepository.aggregate(pipelines);
      return successResponse(
        HttpStatus.OK,
        ResponseMessage.SUCCESS,
        response[0]
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async payNowInvoice(payload: PayNowDto) {
    try {
      const { organizationId, invoiceId, paymentId, userId } = payload;

      const payment = await this.paymentRepository.findOne({
        _id: paymentId,
      });

      const filterQuery = {
        _id: invoiceId,
        organizationId: organizationId,
        isDeleted: false,
      };

      const param: any = {
        status: InvoiceStatusEnum.PAID,
        invoicePayDate: Date.now(),
        paymentId: payment._id,
        paidBy: userId,
      };

      const invoice = await this.invoiceRepository.findOneAndUpdate(
        filterQuery,
        param
      );

      const filterQuery1 = {
        _id: invoice.organizationPlanId,
      };

      const orgplan = await this.OrgPlanRepository.findOne(filterQuery1);

      const paramOrg = {};
      paramOrg['lastInvoicePaidDate'] = new Date();

      const billingCycle = orgplan.billingCycle;
      const billingDate = orgplan.billingDate;

      if (billingCycle === BillingCycleEnum.YEARLY) {
        const newValidTillDate = new Date(billingDate);
        newValidTillDate.setFullYear(newValidTillDate.getFullYear() + 1); // Add 1 year to the billing date
        paramOrg['billingDate'] = newValidTillDate;
      } else if (billingCycle === BillingCycleEnum.MONTHLY) {
        const newValidTillDate = new Date(billingDate);
        newValidTillDate.setMonth(newValidTillDate.getMonth() + 1); // Add 1 month to the billing date
        paramOrg['billingDate'] = newValidTillDate;
      } else if (billingCycle === BillingCycleEnum.HALF_YEARLY) {
        const newValidTillDate = new Date(billingDate);
        newValidTillDate.setMonth(newValidTillDate.getMonth() + 6); // Add 6 months to the billing date
        paramOrg['billingDate'] = newValidTillDate;
      } else {
        const newValidTillDate = new Date(billingDate);
        newValidTillDate.setMonth(newValidTillDate.getMonth() + 3); // Add 3 months to the billing date
        paramOrg['billingDate'] = newValidTillDate;
      }

      this.OrgPlanRepository.findOneAndUpdate(filterQuery1, paramOrg);

      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, invoice);
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
