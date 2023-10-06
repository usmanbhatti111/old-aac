import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  MODEL,
  ResponseMessage,
  errorResponse,
  successResponse,
} from '@shared/constants';
import { AssignOrganizationPlanDto } from '@shared/dto';
import { Model } from 'mongoose';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectModel(MODEL.ORGANIZATION_PLAN)
    private readonly orgPlanModel: Model<any>
  ) {}

  async assignPlan(payload: AssignOrganizationPlanDto) {
    try {
      const response = await this.orgPlanModel.create(payload);
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
}
