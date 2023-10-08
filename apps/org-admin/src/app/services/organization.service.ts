import { Injectable } from '@nestjs/common';
import { errorResponse, successResponse } from '@shared/constants';
import { OrganizationRepository } from '@shared';

@Injectable()
export class OrganizationService {
  constructor(private organizationRepository: OrganizationRepository) {}

  notDeletedFilter = {
    isDeleted: false,
  };

  async createOrganization(payload: any) {
    try {
      const res = await this.organizationRepository.create({
        ...payload
      });
      return successResponse(200, 'Success', res);
    } catch (error) {
      return errorResponse(400, error?.response?.message);
    }
  }

  async getOrganization(payload: any) {
    try {
      const res = await this.organizationRepository.findOne({
          _id: payload.id,
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

  async updateOrganization(payload: any) {
    try {
      const { id } = payload.id;
      delete payload.id,payload.name,payload.registrationNumber;
      const res = await this.organizationRepository.findOneAndUpdate(
        { id },payload
      );
      return successResponse(200, 'Success', res);
    } catch (error) {
      return errorResponse(400, error?.meta?.message || error?.meta?.cause);
    }
  }
}
