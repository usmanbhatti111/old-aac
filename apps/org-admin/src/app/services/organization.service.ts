import { HttpStatus, Injectable } from '@nestjs/common';
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

  async createOrganization(payload: CreateOrganizationDto | any) {
    try {
      const res = await this.organizationRepository.create({
        ...payload,
      });
      return successResponse(HttpStatus.OK, 'Success', res);
    } catch (error) {
      return errorResponse(HttpStatus.BAD_REQUEST, error?.response?.message);
    }
  }

  async getOrganization(payload: GetOrganizationDto) {
    try {
      const res = await this.organizationRepository.findOne({
        _id: payload?.id,
      });
      return successResponse(HttpStatus.OK, 'Success', res);
    } catch (error) {
      return errorResponse(HttpStatus.BAD_REQUEST, error?.response?.message);
    }
  }

  async getOrganizations() {
    try {
      const res = await this.organizationRepository.find();
      return successResponse(HttpStatus.OK, 'Success', res);
    } catch (error) {
      return errorResponse(HttpStatus.BAD_REQUEST, error?.meta?.message);
    }
  }

  async updateOrganization(payload: UpdateOrganizationDto) {
    try {
      const { id } = payload;
      delete payload?.id;
      delete payload?.name;
      delete payload?.crn;
      const res = await this.organizationRepository.findOneAndUpdate(
        { _id: id },
        payload
      );
      return successResponse(HttpStatus.OK, 'Success', res);
    } catch (error) {
      return errorResponse(
        HttpStatus.BAD_REQUEST,
        error?.meta?.message || error?.meta?.cause
      );
    }
  }
}
