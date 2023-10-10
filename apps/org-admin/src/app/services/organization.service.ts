import { Injectable } from '@nestjs/common';
import { errorResponse, successResponse } from '@shared/constants';
import { OrganizationRepository } from '@shared';
import {
  CreateOrganizationDto,
  GetOrganizationDto,
  UpdateOrganizationDto,
} from '@shared/dto';

@Injectable()
export class OrganizationService {
  constructor(private organizationRepository: OrganizationRepository) {}

  notDeletedFilter = {
    isDeleted: false,
  };

  async createOrganization(payload: CreateOrganizationDto) {
    try {
      const res = await this.organizationRepository.create({
        ...payload,
      });
      return successResponse(200, 'Success', res);
    } catch (error) {
      return errorResponse(400, error?.response?.message);
    }
  }

  async getOrganization(payload: GetOrganizationDto) {
    try {
      const res = await this.organizationRepository.findOne({
        _id: payload?.id,
      });
      return successResponse(200, 'Success', res);
    } catch (error) {
      return errorResponse(400, error?.response?.message);
    }
  }

  async getOrganizations() {
    try {
      const res = await this.organizationRepository.find();
      return successResponse(200, 'Success', res);
    } catch (error) {
      return errorResponse(400, error?.meta?.message);
    }
  }

  async updateOrganization(payload: UpdateOrganizationDto) {
    try {
      const { id } = payload;
      delete payload?.id;
      delete payload?.name;
      delete payload?.registrationNumber;
      const res = await this.organizationRepository.findOneAndUpdate(
        { _id: id },
        payload
      );
      return successResponse(200, 'Success', res);
    } catch (error) {
      return errorResponse(400, error?.meta?.message || error?.meta?.cause);
    }
  }
}
