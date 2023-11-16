import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import {
  AddEnquiryDto,
  DeleteEnquiriesDto,
  GetEnquiriesDto,
  IdDto,
  UpdateEnquiryDto,
} from '@shared/dto';
import { EnquiriesService } from '../services/enquiries.service';

@Controller()
export class EnquiriesController {
  constructor(private readonly enquiriesService: EnquiriesService) {}

  @MessagePattern(RMQ_MESSAGES.SUPER_ADMIN.ENQUIRIES.ADD_ENQUIRY)
  async addEnquiries(@Payload() payload: AddEnquiryDto) {
    return await this.enquiriesService.addEnquiries(payload);
  }

  @MessagePattern(RMQ_MESSAGES.SUPER_ADMIN.ENQUIRIES.GET_ENQUIRIES)
  async getEnquiries(@Payload() payload: GetEnquiriesDto) {
    return await this.enquiriesService.getEnquiries(payload);
  }

  @MessagePattern(RMQ_MESSAGES.SUPER_ADMIN.ENQUIRIES.GET_ENQUIRY)
  async getEnquiry(@Payload() payload: IdDto) {
    return await this.enquiriesService.getEnquiry(payload);
  }

  @MessagePattern(RMQ_MESSAGES.SUPER_ADMIN.ENQUIRIES.UPDATE_ENQUIRY)
  async updateEnquiries(@Payload() payload: UpdateEnquiryDto) {
    return await this.enquiriesService.updateEnquiries(payload);
  }

  @MessagePattern(RMQ_MESSAGES.SUPER_ADMIN.ENQUIRIES.DELETE_ENQUIRIES)
  async deleteEnquiries(@Payload() payload: DeleteEnquiriesDto) {
    return await this.enquiriesService.deleteEnquiries(payload);
  }
}
