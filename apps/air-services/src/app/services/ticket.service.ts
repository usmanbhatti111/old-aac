import { Injectable, HttpStatus } from '@nestjs/common';
import { errorResponse, successResponse } from '@shared/constants';
import { TicketRepository } from '@shared';

@Injectable()
export class TicketService {
  constructor(private ticketRepository: TicketRepository) {}

  async createTicket(payload) {
    try {
      //TODO attachment code
      const res = await this.ticketRepository.create({
        ...payload,
      });

      const response = successResponse(
        HttpStatus.CREATED,
        `${payload.subject} Added`,
        res
      );

      // TODO - Add Logger

      return response;
    } catch (error) {
      const err = errorResponse(HttpStatus.BAD_REQUEST, error?.meta?.cause);
      // TODO - Add logger
      return err;
    }
  }
}
