import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import { OrganizationService } from '../services/organization.service';
import { CreateOrganizationDto, GetOrganizationDto, UpdateOrganizationDto } from '@shared/dto';

@Controller()
export class OrganizationController {
  constructor(
    private readonly OrganizationService: OrganizationService
  ) {}

  @MessagePattern({ cmd: RMQ_MESSAGES.ORGANIZATION.CREATE_ORGANTIZATION })
  async createOrganization(@Payload() payload: CreateOrganizationDto) {
    return await this.OrganizationService.createOrganization(payload);
  }

  @MessagePattern({ cmd: RMQ_MESSAGES.ORGANIZATION.GET_ORGANTIZATION })
  async getOrganization(@Payload() payload: GetOrganizationDto) {
    return await this.OrganizationService.getOrganization(payload);
  }

  @MessagePattern({ cmd: RMQ_MESSAGES.ORGANIZATION.GET_ORGANTIZATIONS })
  async getOrganizations() {
    return await this.OrganizationService.getOrganizations();
  }

  @MessagePattern({ cmd: RMQ_MESSAGES.ORGANIZATION.UPDATE_ORGANTIZATION })
  async updateOrganization(@Payload() payload: UpdateOrganizationDto) {
    return await this.OrganizationService.updateOrganization(payload);
  }

}
