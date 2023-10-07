import { HttpStatus, Injectable } from '@nestjs/common';
import { PaymentRepository } from '@shared';
import {
  ResponseMessage,
  errorResponse,
  successResponse,
} from '@shared/constants';
import {
  AddPaymentMethodDto,
  GetOnePaymentDto,
  UpdatePaymentMethodDto,
  getAllPaymentsDTO,
} from '@shared/dto';

@Injectable()
export class PaymentService {
  constructor(private paymentRepository: PaymentRepository) {}

  async addPayment(payload: AddPaymentMethodDto) {
    try {
      const response = await this.paymentRepository.create(payload);
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
      const { id, orgId } = payload;
      delete payload.id;

      const filterQuery = {
        _id: id,
        orgId: orgId,
        isDeleted: false,
      };

      const payment = await this.paymentRepository.findOne(filterQuery);
      if (!payment) {
        return successResponse(
          HttpStatus.OK,
          ResponseMessage.NOT_FOUND,
          payment
        );
      }

      const response = await this.paymentRepository.findOneAndUpdate(
        filterQuery,
        payload
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

  async getAllPayments(payload: getAllPaymentsDTO) {
    try {
      const { orgId, limit, page } = payload;
      const offset = limit * (page - 1);

      const filterQuery = {
        orgId: orgId,
        isDeleted: false,
      };

      const response = await this.paymentRepository.paginate({
        filterQuery,
        offset,
        limit,
      });
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

      const response = await this.paymentRepository.findOne(filterQuery);
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

      const filterQuery = {
        _id: id,
        isDeleted: false,
      };

      const params = {
        isDeleted: true,
      };

      const response = await this.paymentRepository.findOneAndUpdate(
        filterQuery,
        params
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
