import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InvoiceRepository, OrganizationPlanRepository } from '@shared';
import {
  InvoiceStatusEnum,
  ResponseMessage,
  successResponse,
} from '@shared/constants';
import {
  AssignOrgPlanDto,
  BillingDetailsDto,
  CreateInvoiceDto,
  ListInvoicesDTO,
  ListOrgPlan,
  UpdateAssignOrgPlanSuperAdminDto,
  UpdateInvoiceDto,
} from '@shared/dto';
import dayjs from 'dayjs';
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
        page = 1,
        limit = 10,
        search,
        organizationId,
        planTypeId,
        productId,
      } = payload;
      let filterQuery = {};
      const offset = (page - 1) * limit;

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

      let result = await this.orgPlanRepository.paginate(params);
      result = this.calulationsOrgPlans(result.organizationplans);
      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, result);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getOrgPlan(organizationPlanId) {
    try {
      const pipelines = [
        {
          $match: {
            _id: new mongoose.Types.ObjectId(organizationPlanId),
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
      ];

      let result = await this.orgPlanRepository.aggregate(pipelines);

      result = this.calulationsOrgPlans(result);

      if (!result?.length) throw new NotFoundException();

      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, result[0]);
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

  async getAllInvoices(payload: ListInvoicesDTO) {
    try {
      const { page = 0, limit = 10, organizationId, search, status } = payload;
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

      if (status) {
        filterQuery = {
          $or: [{ status: { $regex: status, $options: 'i' } }],
        };
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

      const offset = (page - 1) * limit;

      const params = {
        pipelines,
        offset,
        limit,
      };
      const result = await this.invoiceRepository.paginate(params);

      const pipeline = [
        {
          $match: {
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
      const { organizationPlanId, createdBy } = payload;
      const findOne = await this.orgPlanRepository.findOne({
        _id: organizationPlanId,
      });
      if (!findOne) {
        throw new NotFoundException();
      }

      const pipeline = [
        {
          $match: {
            _id: new mongoose.Types.ObjectId(organizationPlanId),
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
          $addFields: {
            plans: {
              $arrayElemAt: ['$plans', 0],
            },
          },
        },
        {
          $project: {
            organizationId: 1,
            planId: 1,
            additionalUsers: 1,
            additionalStorage: 1,
            planDiscount: 1,
            billingCycle: 1,
            billingDate: 1,
            status: 1,
            'organizations.name': 1,
            'organizations.email': 1,
            'organizations.phoneNo': 1,
            'organizations.address': 1,
            'organizations.postCode': 1,
            'plans.description': 1,
            'plans.defaultUsers': 1,
            'plans.defaultStorage': 1,
            'plans.planPrice': 1,
            'plans.additionalPerUserPrice': 1,
            'plans.additionalStoragePrice': 1,
            'plans.planTypeId': 1,
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
      ];
      const organizationPlan = await this.orgPlanRepository.aggregate(pipeline);
      const details = organizationPlan[0];

      const planPrice = details?.plans?.planPrice;

      const additionalUsersPrices =
        details?.plans?.additionalPerUserPrice * details.additionalUsers;

      const additionalStoragePrices =
        details?.plans?.additionalStoragePrice * details.additionalStorage;

      //subtotal = planprice + (additionalUser*perUserCost)+(additionUser*perUserCost)-invoiceDiscountPercentagec
      const subTotal =
        planPrice + additionalUsersPrices + additionalStoragePrices;

      //afterDiscountAmout = subTotal - invoiceDiscount
      const invoiceDiscount = 0; //On auto generate invoice discount is zero
      const afterDiscountAmout = subTotal - (invoiceDiscount / 100) * subTotal;

      //total = subtotal - VAT
      const vat = 10;
      const total = subTotal - (vat / 100) * subTotal;

      const randomNumber = Math.floor(Math.random() * 10000);
      const invoiceNo = `DOC-${randomNumber}`;

      const dueDate = new Date(details.billingDate);
      dueDate.setDate(dueDate.getDate() + 10); // Add 5 days to the billing date

      const params: any = {
        organizationPlanId,
        organizationId: details.organizationId,
        planId: details.planId,
        details,
        invoiceNo,
        billingDate: details.billingDate,
        dueDate,
        subTotal,
        invoiceDiscount,
        afterDiscountAmout,
        vat,
        total,
        createdBy,
      };
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

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async autoGenerateInvoice() {
    try {
      const documents = [];
      let response = {};
      const todayStart = dayjs().startOf('day').toDate(); // Start of the current day
      const todayEnd = dayjs().endOf('day').toDate();

      const pipeline = [
        {
          $match: {
            status: 'ACTIVE',
            isDeleted: false,
            billingDate: {
              $gte: todayStart,
              $lte: todayEnd,
            },
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
          $addFields: {
            plans: {
              $arrayElemAt: ['$plans', 0],
            },
          },
        },
        {
          $project: {
            organizationId: 1,
            planId: 1,
            additionalUsers: 1,
            additionalStorage: 1,
            planDiscount: 1,
            billingCycle: 1,
            billingDate: 1,
            status: 1,
            'organizations.name': 1,
            'organizations.email': 1,
            'organizations.phoneNo': 1,
            'organizations.address': 1,
            'organizations.postCode': 1,
            'plans.description': 1,
            'plans.defaultUsers': 1,
            'plans.defaultStorage': 1,
            'plans.planPrice': 1,
            'plans.additionalPerUserPrice': 1,
            'plans.additionalStoragePrice': 1,
            'plans.planTypeId': 1,
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
      ];

      const organizationPlans = await this.orgPlanRepository.aggregate(
        pipeline
      );
      // const details = organizationPlans;
      organizationPlans.forEach(async (details) => {
        const planPrice = details?.plans?.planPrice;

        const additionalUsersPrices =
          details?.plans?.additionalPerUserPrice * details.additionalUsers;

        const additionalStoragePrices =
          details?.plans?.additionalStoragePrice * details.additionalStorage;

        //subtotal = planprice + (additionalUser*perUserCost)+(additionUser*perUserCost)-invoiceDiscountPercentagec
        const subTotal =
          planPrice + additionalUsersPrices + additionalStoragePrices;

        //afterDiscountAmout = subTotal - invoiceDiscount
        const invoiceDiscount = 0; //On auto generate invoice discount is zero
        const afterDiscountAmout =
          subTotal - (invoiceDiscount / 100) * subTotal;

        //total = subtotal - VAT
        const vat = 10;
        const total = subTotal - (vat / 100) * subTotal;

        const randomNumber = Math.floor(Math.random() * 10000);
        const invoiceNo = `DOC-${randomNumber}`;

        const dueDate = new Date(details.billingDate);
        dueDate.setDate(dueDate.getDate() + 10); // Add 5 days to the billing date

        const params: any = {
          organizationPlanId: details._id,
          organizationId: details.organizationId,
          planId: details.planId,
          details,
          invoiceNo,
          billingDate: details.billingDate,
          dueDate,
          subTotal,
          invoiceDiscount,
          afterDiscountAmout,
          vat,
          total,
        };
        documents.push(params);
      });
      response = await this.invoiceRepository.createMany(documents);

      return successResponse(
        HttpStatus.CREATED,
        ResponseMessage.CREATED,
        response
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async autoOverDueInvoices() {
    try {
      let response = {};
      const todayStart = dayjs().startOf('day').toDate(); // Start of the current day
      const todayEnd = dayjs().endOf('day').toDate();

      const pipeline = [
        {
          $match: {
            status: 'PENDING',
            isDeleted: false,
            dueDate: {
              $gte: todayStart,
              $lte: todayEnd,
            },
          },
        },
      ];

      const invoiceIds = [];
      const orgPlanIds = [];
      const invoices = await this.invoiceRepository.aggregate(pipeline);

      const filterQueryInvoices = {
        _id: {
          $in: invoiceIds,
        },
      };
      const filterQueryOrgPlan = {
        _id: {
          $in: orgPlanIds,
        },
      };

      const updateInvoices = {
        $set: { status: 'OVERDUE' },
      };

      const updateOrgPlan = {
        $set: { status: 'INACTIVE' },
      };

      invoices.forEach((row) => {
        invoiceIds.push(row._id);
        orgPlanIds.push(row.organizationPlanId);
      });

      response = await this.invoiceRepository.updateMany(
        filterQueryInvoices,
        updateInvoices
      );
      await this.orgPlanRepository.updateMany(
        filterQueryOrgPlan,
        updateOrgPlan
      );

      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, response);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async updateInvoice(payload: UpdateInvoiceDto) {
    try {
      const { invoiceId, updatedBy, dueDate, invoiceDiscount, status } =
        payload;
      let details: any = {};

      const filterQuery = {
        _id: new mongoose.Types.ObjectId(invoiceId),
      };

      const invoiceData = await this.invoiceRepository.findOne(filterQuery);
      details = invoiceData?.details;

      const planPrice = details?.plans?.planPrice;

      const additionalUsersPrices =
        details?.plans?.additionalPerUserPrice * details.additionalUsers;

      const additionalStoragePrices =
        details?.plans?.additionalStoragePrice * details.additionalStorage;

      //subtotal = planprice + (additionalUser*perUserCost)+(additionUser*perUserCost)
      const subTotal =
        planPrice + additionalUsersPrices + additionalStoragePrices;

      //afterDiscountAmout = subTotal - invoiceDiscount
      const afterDiscountAmout = subTotal - (invoiceDiscount / 100) * subTotal;
      const vat = 10;

      //total = afterDiscountAmout - VAT
      const total = afterDiscountAmout - (vat / 100) * afterDiscountAmout;

      const params: any = {
        dueDate,
        status,
        subTotal: subTotal,
        invoiceDiscount,
        afterDiscountAmout,
        vat,
        total,
        updatedBy,
      };
      const response = await this.invoiceRepository.findOneAndUpdate(
        filterQuery,
        params
      );
      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, response);
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

  calulationsOrgPlans(organizationplans) {
    const organizationplansNew = organizationplans.map((row) => {
      const planDiscount = row?.planDiscount;
      const additionalUsers = row?.additionalUsers;
      const additionalStorage = row?.additionalStorage;

      const planPrice = row?.plans?.planPrice;
      const additionalPerUserPrice = row?.plans?.additionalPerUserPrice;
      const additionalStoragePrice = row?.plans?.additionalStoragePrice;

      const subtotal =
        planPrice +
        additionalUsers * additionalPerUserPrice +
        additionalStorage * additionalStoragePrice;
      const total = subtotal - (planDiscount / 100) * subtotal;
      return { ...row, subtotal, total };
    });
    return organizationplansNew;
  }
}
