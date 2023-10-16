import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InvoiceRepository } from '@shared';
import { ResponseMessage, successResponse } from '@shared/constants';
import { GetAllInvoicesDto, GetInvoiceDto, PayNowDto } from '@shared/dto';

@Injectable()
export class InvoiceService {
  constructor(private invoiceRepository: InvoiceRepository) {}

  async getAllInvoices(payload: GetAllInvoicesDto) {
    try {
      const { organizationId, limit, page } = payload;
      const offset = limit * (page - 1);

      const filterQuery = {
        organizationPlanId: organizationId,
      };

      const response = await this.invoiceRepository.paginate({
        filterQuery,
        offset,
        limit,
      });
      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, response);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getOneInvoice(payload: GetInvoiceDto) {
    try {
      const { invoiceId, organizationId } = payload;
      const filterQuery = {
        _id: invoiceId,
        organizationId: organizationId,
        isDeleted: false,
      };

      const response = await this.invoiceRepository.findOne(filterQuery);
      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, response);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async payNowInvoice(payload: PayNowDto) {
    try {
      const { organizationId, invoiceId } = payload;
      const filterQuery = {
        _id: invoiceId,
        organizationId: organizationId,
        isDeleted: false,
      };

      const response = await this.invoiceRepository.findOne(filterQuery);
      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, response);
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
