import { Injectable } from '@nestjs/common';
import {
  ResponseCode,
  ResponseMessage,
  errorResponse,
  successResponse,
} from '@shared/constants';
import { AssignOrganizationPlanDto } from '@shared/dto';
import { PrismaService } from '@shared/services';

@Injectable()
export class BillingService {
  constructor(private prisma: PrismaService) {}

  async assignPlan(payload: AssignOrganizationPlanDto) {
    try {
      payload.billing_date = new Date(payload.billing_date);
      const response = await this.prisma.organizationPlan.create({
        data: payload,
      });
      return successResponse(
        ResponseCode.CREATED,
        ResponseMessage.CREATED,
        response
      );
    } catch (error) {
      return errorResponse(
        ResponseCode.BAD_REQUEST,
        ResponseMessage.BAD_REQUEST,
        error
      );
    }
  }

  async billingDetails(payload: AssignOrganizationPlanDto) {
    try {
      const response = await this.prisma.organizationPlan.create({
        data: payload,
      });
      return successResponse(
        ResponseCode.OK,
        ResponseMessage.SUCCESS,
        response
      );
    } catch (error) {
      return errorResponse(
        ResponseCode.BAD_REQUEST,
        ResponseMessage.BAD_REQUEST,
        error
      );
    }
  }

  async addDiscount(payload: AssignOrganizationPlanDto) {
    try {
      const response = await this.prisma.organizationPlan.create({
        data: payload,
      });
      return successResponse(
        ResponseCode.OK,
        ResponseMessage.SUCCESS,
        response
      );
    } catch (error) {
      return errorResponse(
        ResponseCode.BAD_REQUEST,
        ResponseMessage.BAD_REQUEST,
        error
      );
    }
  }
}
