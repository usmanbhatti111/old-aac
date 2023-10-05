import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import { TicketService } from '../services/ticket.service';
import { CreateTicketDTO } from '@shared/dto';
@Controller()
export class TicketController {
  constructor(private ticketService: TicketService) {}

  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.TICKETS.CREATE_TICKET)
  public async createTicket(@Payload() payload: CreateTicketDTO) {
    return this.ticketService.createTicket(payload);
  }
}
