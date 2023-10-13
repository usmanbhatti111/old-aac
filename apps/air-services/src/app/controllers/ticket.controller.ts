import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import { TicketService } from '../services/ticket.service';
import {
  AssociateAssetsDTO,
  CreateTicketDTO,
  GetAssociateAssetsDto,
  GetTicketByIdDto,
  IdDto,
} from '@shared/dto';
import { DetachAssetsDTO } from '@shared/dto';
@Controller()
export class TicketController {
  constructor(private ticketService: TicketService) {}

  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.TICKETS.CREATE_TICKET)
  public async createTicket(@Payload() payload: CreateTicketDTO) {
    return this.ticketService.createTicket(payload);
  }

  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.TICKETS.GET_TICKET_DETAILS)
  public async getTicketDetails(@Payload() payload: GetTicketByIdDto) {
    return this.ticketService.getTicketDetails(payload);
  }

  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.TICKETS.GET_ASSOCIATE_ASSETS)
  public async getAssociateAssets(@Payload() payload: GetAssociateAssetsDto) {
    return this.ticketService.getAssociateAssets(payload);
  }

  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.TICKETS.ASSOCIATE_ASSETS)
  public async associateAssets(@Payload() payload: AssociateAssetsDTO) {
    return this.ticketService.associateAssets(payload);
  }
  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.TICKETS.DETACH_ASSETS)
  public async detachAssets(@Payload() payload: DetachAssetsDTO) {
    return this.ticketService.detachAssets(payload);
  }
  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.TICKETS.CREATE_CHILD_TICKET)
  public async createChildTicket(@Payload() payload: CreateTicketDTO) {
    return this.ticketService.createChildTicket(payload);
  }
  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.TICKETS.GET_CHILD_TICKETS)
  public async getChildTicket(@Payload() payload: IdDto) {
    return this.ticketService.getChildTicket(payload);
  }
  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.TICKETS.DELETE_CHILD_TICKETS)
  public async deleteChildTicket(@Payload() payload: IdDto) {
    return this.ticketService.deleteChildTicket(payload);
  }
  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.TICKETS.EDIT_CHILD_TICKETS)
  public async editChildTicket(@Payload() payload: IdDto) {
    return this.ticketService.editChildTicket(payload);
  }
}
