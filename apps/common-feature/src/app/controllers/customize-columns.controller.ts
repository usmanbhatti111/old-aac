import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import {
  CreateDealCuztomizeColumnDto,
  GetCustomizedColumns,
} from '@shared/dto';
import { CustomizeColumnsService } from '@shared/services';

@Controller()
export class CustomizedColumnsController {
  constructor(
    private readonly customizeColumnsService: CustomizeColumnsService
  ) {}

  @MessagePattern(RMQ_MESSAGES.CUSTOMIZED_COLUMNS.GET_CUSTOMIZE_COLUMN)
  async getCustomizedColumns(@Payload() payload: GetCustomizedColumns) {
    return this.customizeColumnsService.getCustomizedColumns(payload);
  }

  @MessagePattern(
    RMQ_MESSAGES.CUSTOMIZED_COLUMNS.CREATE_OR_UPDATE_CUSTOMIZE_COLUMN
  )
  async createOrUpdateCustomizeColumn(
    @Payload() payload: CreateDealCuztomizeColumnDto
  ) {
    return this.customizeColumnsService.createCustomizeColumns(payload);
  }
}
