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
      return errorResponse(400, error?.meta?.message);
    }
  }

  async getOrganization(payload: any) {
    try {
      const res = await this.organizationRepository.findOne({
        where: {
          id: payload.id,
        },
      });
      return successResponse(200, 'Success', res);
    } catch (error) {
      return errorResponse(400, error?.meta?.message);
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
      const { id, registration_number,name, ...updatedFields } = payload;

      const res = await this.organizationRepository.findOneAndUpdate({
        where: { id },},{...updatedFields}
      );
      return successResponse(200, 'Success', res);
    } catch (error) {
      return errorResponse(400, error?.meta?.message || error?.meta?.cause);
    }
  }
}
