import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import { GetCustomizedColumns } from '@shared/dto';
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
}
