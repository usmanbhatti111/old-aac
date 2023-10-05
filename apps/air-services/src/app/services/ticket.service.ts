import { Injectable, HttpStatus } from '@nestjs/common';
import { MODEL, errorResponse, successResponse } from '@shared/constants';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TicketService {
  constructor(
    @InjectModel(MODEL.TICKET) private readonly ticketModel: Model<any>
  ) {}

  async createTicket(payload) {
    try {
      //TODO attachment code
      const res = await this.ticketModel.create({
        ...payload,
      })

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
