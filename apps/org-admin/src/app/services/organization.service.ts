import { Injectable } from '@nestjs/common';
import { errorResponse, successResponse } from '@shared/constants';
import { PrismaService } from '@shared/services';

@Injectable()
export class OrganizationService {
  constructor(private prisma: PrismaService) {}

  notDeletedFilter = {
    isDeleted: false,
  };

  async createOrganization(payload: any) {
    try {
      const res = await this.prisma.organization.create({
        data: payload,
      });
      return successResponse(200, 'Success', res);
    } catch (error) {
      return errorResponse(400, error?.meta?.message);
    }
  }

  async getOrganization(payload: any) {
    try {
      const res = await this.prisma.organization.findFirst({
        where: {
          id: payload.id,
        },
      });
      return successResponse(200, 'Success', res);
    } catch (error) {
      return errorResponse(400, error?.meta?.message);
    }
  }

  async getOrganizations(payload: any) {
    try {
      const res = await this.prisma.organization.findMany({
        where: {},
      });
      return successResponse(200, 'Success', res);
    } catch (error) {
      return errorResponse(400, error?.meta?.message);
    }
  }

  async updateOrganization(payload: any) {
    try {
      const { id, registration_number,name, ...updatedFields } = payload;

      const res = await this.prisma.organization.update({
        where: { id }, 
        data: updatedFields, 
      });
      return successResponse(200, 'Success', res);
    } catch (error) {
      console.log('error', error);
      return errorResponse(400, error?.meta?.message || error?.meta?.cause);
    }
  }
}
