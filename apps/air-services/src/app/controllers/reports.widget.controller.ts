import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import { ReportWidgetService } from '../services/reports.widget.service';
import {
  CreateReportWidgettDTO,
  IdDto,
  ListReportWidgetDTO,
} from '@shared/dto';

@Controller()
export class ReportWidgetController {
  constructor(private readonly reportWidgetService: ReportWidgetService) {}

  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.WIDGETS.CREATE_WIDGETS)
  public async addReportWidget(@Payload() payload: CreateReportWidgettDTO) {
    return this.reportWidgetService.addReportWidget(payload);
  }

  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.WIDGETS.GET_WIDGETS_LIST)
  public async getReportWidgetList(@Payload() payload: ListReportWidgetDTO) {
    return this.reportWidgetService.getReportWidgets(payload);
  }

  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.WIDGETS.GET_WIDGETS)
  public async getReportWidgetById(@Payload() payload: IdDto) {
    return this.reportWidgetService.getReportWidgetById(payload);
  }
}
