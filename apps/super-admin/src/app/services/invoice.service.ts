import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InvoiceRepository, OrganizationPlanRepository } from '@shared';
import {
  OrganizationPlanStatusEnum,
  ResponseMessage,
  successResponse,
} from '@shared/constants';
import { AssignOrgPlanDto, CreateInvoiceDto, ListOrgPlan } from '@shared/dto';
import { SuperAdmin } from '@shared/schemas';
import mongoose from 'mongoose';

@Injectable()
export class InvoiceService {
  constructor(
    private invoiceRepository: InvoiceRepository,
    private orgPlanRepository: OrganizationPlanRepository
  ) {}

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

  async getOrgPlan(organizationPlanId: string) {
    try {
      const aggregatePipeline: any = [
        {
          $match: {
            _id: new mongoose.Types.ObjectId(organizationPlanId),
          },
        },
        {
          $lookup: {
            from: SuperAdmin.name,
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

  async listOrgPlan(payload: ListOrgPlan) {
    try {
      const { page: offset = 0, limit = 10 } = payload;
      const pipelines: any = [
        {
          $match: {
            status: OrganizationPlanStatusEnum.ACTIVE,
          },
        },
        {
          $lookup: {
            from: SuperAdmin.name,
            localField: 'assignedBy',
            foreignField: '_id',
            as: 'assignedBy',
          },
        }, // TODO: add pipeline to include other required table's data
      ];
      const params = {
        pipelines,
        offset,
        limit,
      };
      const response = await this.orgPlanRepository.paginate(params);
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
}
