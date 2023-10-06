import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  ResponseMessage,
  errorResponse,
  successResponse,
} from '@shared/constants';
import {
  AddPaymentMethodDto,
  GetOnePaymentDto,
  UpdatePaymentMethodDto,
} from '@shared/dto';
import { Payment, PaymentDocument } from '@shared/schemas';
import { Model } from 'mongoose';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>
  ) {}

  async addPayment(payload: AddPaymentMethodDto) {
    try {
      const response = await this.paymentModel.create(payload);
      return successResponse(
        HttpStatus.CREATED,
        ResponseMessage.CREATED,
        response
      );
    } catch (error) {
      return errorResponse(
        HttpStatus.BAD_REQUEST,
        ResponseMessage.BAD_REQUEST,
        error
      );
    }
  }

  async updatePayment(payload: UpdatePaymentMethodDto) {
    try {
      const { id } = payload;
      delete payload.id;
      const response = await this.paymentModel.findOneAndUpdate(
        { _id: id },
        { $set: { ...payload } },
        { new: true }
      );
      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, response);
    } catch (error) {
      return errorResponse(
        HttpStatus.BAD_REQUEST,
        ResponseMessage.BAD_REQUEST,
        error
      );
    }
  }

  async getAllPayments(orgId: string) {
    try {
      const filterQuery = {
        orgId: orgId,
        isDeleted: false,
      };
      const response = await this.paymentModel.find(filterQuery);
      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, response);
    } catch (error) {
      return errorResponse(
        HttpStatus.BAD_REQUEST,
        ResponseMessage.BAD_REQUEST,
        error
      );
    }
  }

  async getOnePayment(payload: GetOnePaymentDto) {
    try {
      const { orgId, id } = payload;
      const filterQuery = {
        _id: id,
        orgId: orgId,
        isDeleted: false,
      };

      const response = await this.paymentModel.findOne(filterQuery);
      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, response);
    } catch (error) {
      return errorResponse(
        HttpStatus.BAD_REQUEST,
        ResponseMessage.BAD_REQUEST,
        error
      );
    }
  }

  async deleteOnePayment(payload: GetOnePaymentDto) {
    try {
      const { id } = payload;
      const response = await this.paymentModel.findOneAndUpdate(
        { _id: id },
        { $set: { isDeleted: true } },
        { new: true }
      );
      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, response);
    } catch (error) {
      return errorResponse(
        HttpStatus.BAD_REQUEST,
        ResponseMessage.BAD_REQUEST,
        error
      );
    }
  }
}
