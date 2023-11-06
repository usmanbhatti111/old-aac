import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import { TicketService } from '../services/ticket.service';
import {
  AssociateAssetsDTO,
  CreateTicketDTO,
  IdDto,
  DetachAssetsDTO,
  ListTicketDTO,
  paginationDTO,
  GetTicketByIdDto,
  GetAssociateAssetsDto,
  AssociatePurchaseOrderDto,
  DeleteAssociatePurchaseOrderDto,
  BulkTicketUpdateDto,
} from '@shared/dto';

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
  public async getChildTicket(
    @Payload() payload: { id: IdDto; pagination: paginationDTO }
  ) {
    return this.ticketService.getChildTicket(payload);
  }
  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.TICKETS.DELETE_CHILD_TICKETS)
  public async deleteChildTicket(@Payload() payload: IdDto) {
    return this.ticketService.deleteChildTicket(payload);
  }
  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.TICKETS.EDIT_TICKETS)
  public async editTicket(@Payload() payload: IdDto) {
    return this.ticketService.editTicket(payload);
  }

  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.TICKETS.DELETE_TICKETS)
  public async deleteTickets(@Payload() payload: any) {
    return this.ticketService.deleteTickets(payload);
  }

  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.TICKETS.CHANGE_STATUS)
  public async updateTicketStatus(@Payload() payload: IdDto) {
    return this.ticketService.updateTicketStatus(payload);
  }

  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.TICKETS.GET_TICKET_LIST)
  public async getTicketList(payload: {
    listTicketDTO: ListTicketDTO;
    columnNames: string[];
  }) {
    return this.ticketService.getTicketList(payload);
  }

  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.ASSETS.ADD_ASSOCIATE_ORDER)
  async addAssociatePurchaseOrder(
    @Payload() payload: { id: IdDto; ticketsIds: AssociatePurchaseOrderDto }
  ) {
    return await this.ticketService.addAssociatePurchaseOrder(payload);
  }
  @MessagePattern({
    cmd: RMQ_MESSAGES.AIR_SERVICES.ASSETS.GET_PURCHASEORDERASSOCIATE,
  })
  async getPurchaseOrderAssociate(@Payload() payload: { id: IdDto }) {
    const { id } = payload;

    return await this.ticketService.getPurchaseOrderAssociate(id);
  }
  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.ASSETS.DELETE_ASSOCIATE_ORDER)
  async dissociatePurchaseOrder(
    @Payload()
    payload: {
      id: IdDto;
      purchaseOrderId: DeleteAssociatePurchaseOrderDto;
    }
  ) {
    return await this.ticketService.dissociatePurchaseOrder(payload);
  }
  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.TICKETS.BULK_TICKET_UPDATE)
  async bulkUpdateTickets(
    @Payload()
    payload: {
      ids: string[];
      dto: BulkTicketUpdateDto;
    }
  ) {
    return await this.ticketService.bulkUpdateTickets(payload);
  }
}
