import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PaymentRepository } from '@shared';
import { ResponseMessage, successResponse } from '@shared/constants';
import {
  AddPaymentMethodDto,
  DeletePaymentDto,
  GetOnePaymentDto,
  UpdatePaymentMethodDto,
  getAllPaymentsDTO,
} from '@shared/dto';
import mongoose from 'mongoose';

@Injectable()
export class PaymentService {
  constructor(private paymentRepository: PaymentRepository) {}

  async addPayment(payload: AddPaymentMethodDto) {
    try {
      const param: any = payload;
      const response = await this.paymentRepository.create(param);
      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, response);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async updatePayment(payload: UpdatePaymentMethodDto) {
    try {
      const { id } = payload;
      delete payload.id;

      const filterQuery = {
        _id: id,
      };

      const params: any = payload;
      const response = await this.paymentRepository.findOneAndUpdate(
        filterQuery,
        params
      );
      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, response);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getAllPayments(payload: getAllPaymentsDTO) {
    try {
      const { organizationId, page = 1, limit = 10, search } = payload;
      const offset = limit * (page - 1);
      let filterQuery = {};

      if (search) {
        filterQuery = {
          $or: [{ 'organizations.name': { $regex: search, $options: 'i' } }],
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
            from: 'products',
            localField: 'manageSubscriptionFor',
            foreignField: '_id',
            as: 'products',
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
      const response = await this.paymentRepository.paginate(params);
      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, response);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getOnePayment(payload: GetOnePaymentDto) {
    try {
      const { organizationId, id } = payload;

      const pipeline = [
        {
          $match: {
            _id: new mongoose.Types.ObjectId(id),
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
      ];

      const response = await this.paymentRepository.aggregate(pipeline);
      if (!response) throw new NotFoundException('Payment Not Found');

      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, response);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async deleteOnePayment(payload: DeletePaymentDto) {
    try {
      const { id, deletedBy } = payload;

      const filterQuery = {
        _id: id,
        isDeleted: false,
      };

      const params = {
        isDeleted: true,
        deletedBy,
      };

      const response = await this.paymentRepository.findOneAndUpdate(
        filterQuery,
        params
      );
      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, response);
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
