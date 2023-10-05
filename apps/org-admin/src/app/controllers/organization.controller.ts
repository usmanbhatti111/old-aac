import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import { OrganizationService } from '../services/organization.service';

@Controller()
export class OrganizationController {
  constructor(
    private readonly OrganizationService: OrganizationService
  ) {}

  @MessagePattern({ cmd: RMQ_MESSAGES.ORGANIZATION.CREATE_ORGANTIZATION })
  async createJob(@Payload() payload: any) {
    return await this.OrganizationService.createOrganization(payload);
  }

  @MessagePattern({ cmd: RMQ_MESSAGES.ORGANIZATION.GET_ORGANTIZATION })
  async getJob(@Payload() payload: any) {
    return await this.OrganizationService.getOrganization(payload);
  }

  @MessagePattern({ cmd: RMQ_MESSAGES.ORGANIZATION.GET_ORGANTIZATIONS })
  async getOrganization(@Payload() payload: any) {
    return await this.OrganizationService.getOrganizations();
  }

  @MessagePattern({ cmd: RMQ_MESSAGES.ORGANIZATION.UPDATE_ORGANTIZATION })
  async updateJob(@Payload() payload: any) {
    return await this.OrganizationService.updateOrganization(payload);
  }

}
