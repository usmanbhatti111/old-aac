import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import {
  CreateDealDto,
  DealAssociationDto,
  DealTaskDto,
  DeleteDealsDto,
  GetDealsGridtViewDto,
  GetDealsListViewDto,
  GetSoftDeletedDealsDto,
  IdDto,
  RestoreDealActionDto,
  UpdateDealDto,
} from '@shared/dto';
import { DealsService } from '../services/deals.service';

@Controller()
export class DealsController {
  constructor(private readonly dealsService: DealsService) {}

  @MessagePattern(RMQ_MESSAGES.SALES.DEALS.CREATE_DEAL)
  async createDeal(@Payload() payload: CreateDealDto) {
    return this.dealsService.createDeal(payload);
  }

  @MessagePattern(RMQ_MESSAGES.SALES.DEALS.UPDATE_DEAL)
  async updateDeal(@Payload() payload: UpdateDealDto) {
    return this.dealsService.updateDeal(payload);
  }

  @MessagePattern(RMQ_MESSAGES.SALES.DEALS.GET_DEALS_LIST_VIEW)
  async getDealsListVew(@Payload() payload: GetDealsListViewDto) {
    return this.dealsService.getDealsListVew(payload);
  }

  @MessagePattern(RMQ_MESSAGES.SALES.DEALS.GET_DEALS_GRID_VIEW)
  async getDealsGridView(@Payload() payload: GetDealsGridtViewDto) {
    return this.dealsService.getDealsGridView(payload);
  }

  @MessagePattern(RMQ_MESSAGES.SALES.DEALS.DELTE_DEALS)
  async deleteDeals(@Payload() payload: DeleteDealsDto) {
    return this.dealsService.deleteDeals(payload);
  }

  @MessagePattern(RMQ_MESSAGES.SALES.DEALS.GET_SOFT_DELETED_DEALS)
  async getSoftDeletedDeals(@Payload() payload: GetSoftDeletedDealsDto) {
    return this.dealsService.getSoftDeletedDeals(payload);
  }

  @MessagePattern(RMQ_MESSAGES.SALES.DEALS.RESTORE_DEAL_ACTION)
  async restoreDealActionRestore(@Payload() payload: RestoreDealActionDto) {
    return this.dealsService.restoreDealAction(payload);
  }

  @MessagePattern(RMQ_MESSAGES.SALES.DEALS.CREATE_ASSOCIATION)
  async associateDeal(@Payload() payload: DealAssociationDto) {
    return this.dealsService.associateDeal(payload);
  }

  @MessagePattern(RMQ_MESSAGES.SALES.DEALS.DELETE_ASSOCIATION)
  async disassociateDeal(@Payload() payload: DealAssociationDto) {
    return this.dealsService.disassociateDeal(payload);
  }

  @MessagePattern(RMQ_MESSAGES.SALES.DEAL_VIEWS.DELETE_TASK)
  async deleteTask(@Payload() payload: DealTaskDto) {
    return this.dealsService.deleteTask(payload);
  }

  @MessagePattern(RMQ_MESSAGES.SALES.DEAL_VIEWS.ADD_TASK)
  async addTask(@Payload() payload: DealTaskDto) {
    return this.dealsService.addTask(payload);
  }

  // @MessagePattern(RMQ_MESSAGES.SALES.DEAL_VIEWS.DELETE_NOTE)
  // async deleteNote(@Payload() payload: DealNoteDto) {
  //   return this.dealsService.deleteNote(payload);
  // }

  // @MessagePattern(RMQ_MESSAGES.SALES.DEAL_VIEWS.ADD_NOTE)
  // async addNote(@Payload() payload: DealNoteDto) {
  //   return this.dealsService.addNote(payload);
  // }

  @MessagePattern(RMQ_MESSAGES.SALES.DEALS.GET_ASSOCIATIONS)
  async populateAssociations(@Payload() payload: IdDto) {
    return this.dealsService.populateAssociations(payload);
  }

  @MessagePattern(RMQ_MESSAGES.SALES.DEALS.DEAL_ACTION_PREVIEW)
  async dealPreview(@Payload() payload: IdDto) {
    return this.dealsService.dealPreview(payload);
  }

  @MessagePattern(RMQ_MESSAGES.SALES.DEAL_VIEWS.GET_TASKS)
  async getTasks(@Payload() payload: IdDto) {
    return this.dealsService.getTasks(payload);
  }

  // @MessagePattern(RMQ_MESSAGES.SALES.DEAL_VIEWS.GET_NOTES)
  // async getNotes(@Payload() payload: IdDto) {
  //   return this.dealsService.getNotes(payload);
  // }
}
