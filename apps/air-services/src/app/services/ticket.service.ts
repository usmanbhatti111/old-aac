import { Injectable, HttpStatus } from '@nestjs/common';
import { PrismaService } from '@shared/services';
import { errorResponse, successResponse } from '@shared/constants';

@Injectable()
export class TicketService {
  constructor(private prisma: PrismaService) {}

  async createTicket(payload) {
    try {
      //TODO attachment code
      const res = await this.prisma.tickets.create({
        data: payload,
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
