import { HttpStatus, Injectable } from '@nestjs/common';
import {
  errorResponse,
  successResponse,
  ResponseMessage,
} from '@shared/constants';
import { PurchaseRepository, mongooseDateFilter } from '@shared';
import {
  DeletePurchaseOrderDto,
  UpdatePurchaseOrderDto,
  IdDTO,
  FilterPurchaseOrderDto,
} from '@shared/dto';

import { Types } from 'mongoose';
import { RpcException } from '@nestjs/microservices';
@Injectable()
export class PurchaseOrderService {
  constructor(private purchaseRepository: PurchaseRepository) {}
  async addPurchaseOrder(payload: any) {
    try {
      if (Array.isArray(payload.purchaseDetails)) {
        let subTotal = 0;
        payload.purchaseDetails.forEach((purchaseDetail) => {
          if (purchaseDetail.costPerItem && purchaseDetail.quantity) {
            subTotal +=
              purchaseDetail.costPerItem * purchaseDetail.quantity +
              (purchaseDetail.taxRate || 0) +
              (purchaseDetail.shipping || 0) -
              (purchaseDetail.discount || 0);
          }
        });
        payload.subTotal = subTotal;
      } else {
        payload.subTotal = 0;
      }

      const res = await this.purchaseRepository.create({ ...payload });
      return successResponse(HttpStatus.CREATED, 'Success', res);
    } catch (error) {
      throw new RpcException(error);
    }
  }
  async deletePurchaseOrder(payload: DeletePurchaseOrderDto) {
    try {
      const { id } = payload;
      const res = await this.purchaseRepository.delete({ _id: id });

      return successResponse(HttpStatus.OK, 'Success', res);
    } catch (error) {
      return errorResponse(HttpStatus.BAD_REQUEST, 'Bad Request', error?.name);
    }
  }
  async updatePurchaseOrder(payload: UpdatePurchaseOrderDto) {
    try {
      const { id } = payload;
      delete payload.id;
      const res = await this.purchaseRepository.findOneAndUpdate(
        { _id: id },
        payload
      );
      return successResponse(HttpStatus.OK, 'Success', res);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getPurchaseOrder(payload: IdDTO) {
    try {
      const res = await this.purchaseRepository.findOne({
        _id: payload.id,
      });
      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, res);
    } catch (error) {
      throw new RpcException(error);
    }
  }
  async getPurchaseOrderList(payload: FilterPurchaseOrderDto) {
    try {
      const {
        page,
        limit,
        search,
        departmentId,
        vendorId,
        status,
        expectedDeliveryDate,
        createdAt,
      } = payload;

      const filterQuery = {};
      const searchFilter = {};
      let expiryFilter = {};
      const pipeline: any = [
        {
          $lookup: {
            from: 'attachments',
            localField: 'attachments',
            foreignField: '_id',
            as: 'attachmentDetails',
          },
        },
        {
          $unwind: {
            path: '$attachmentDetails',
            preserveNullAndEmptyArrays: true,
          },
        },
      ];

      if (status) {
        filterQuery['status'] = status;
      }
      if (vendorId) {
        filterQuery['vendorId'] = new Types.ObjectId(vendorId);
      }
      if (departmentId) {
        filterQuery['departmentId'] = new Types.ObjectId(departmentId);
      }
      if (search) {
        searchFilter['$or'] = [
          { orderName: { $regex: search, $options: 'i' } },
          { orderNumber: { $regex: search, $options: 'i' } },
          { status: { $regex: search, $options: 'i' } },
          { currency: { $regex: search, $options: 'i' } },
        ];
        pipeline.push({ $match: searchFilter });
      }

      if (createdAt) {
        expiryFilter = mongooseDateFilter(createdAt, 'createdAt');
        pipeline.push({ $match: expiryFilter });
      }
      if (expectedDeliveryDate) {
        expiryFilter = mongooseDateFilter(
          expectedDeliveryDate,
          'expectedDeliveryDate'
        );
        pipeline.push({ $match: expiryFilter });
      }
      const response = await this.purchaseRepository.newPaginate(
        filterQuery,
        pipeline,
        {
          page,
          limit,
        }
      );
      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, response);
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
