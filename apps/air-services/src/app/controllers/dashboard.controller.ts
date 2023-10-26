import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import { DashboardService } from '../services/dashboard.service';
import { CreateDashboardtDTO, IdDto, ListDashboardDTO } from '@shared/dto';

@Controller()
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.DASHBOARD.CREATE_DASHBOARD)
  public async addDashboard(@Payload() payload: CreateDashboardtDTO) {
    return this.dashboardService.addDashboard(payload);
  }

  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.DASHBOARD.GET_DASHBOARD_LIST)
  public async getDashboardList(@Payload() payload: ListDashboardDTO) {
    return this.dashboardService.getDashboardList(payload);
  }

  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.DASHBOARD.GET_DASHBOARD)
  public async getDashboardById(@Payload() payload: IdDto) {
    return this.dashboardService.getDashboardById(payload);
  }
}
