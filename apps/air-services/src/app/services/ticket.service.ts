import { Injectable, HttpStatus } from '@nestjs/common';
import { errorResponse, successResponse } from '@shared/constants';
import { TicketRepository } from '@shared';
import mongoose from 'mongoose';
import { AssociateAssetsDTO, DetachAssetsDTO } from '@shared/dto';

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

  async associateAssets(payload: AssociateAssetsDTO) {
    try {
      const { id, assetIds } = payload;
      const res = await this.ticketRepository.findByIdAndUpdate(
        { _id: id },
        { $addToSet: { associateAssets: { $each: assetIds } } }
      );

      const response = successResponse(HttpStatus.OK, `Associated`, res);

      return response;
    } catch (error) {
      const err = errorResponse(HttpStatus.BAD_REQUEST, error?.meta?.cause);
      return err;
    }
  }
  async detachAssets(payload: DetachAssetsDTO) {
    try {
      const { id, assetId } = payload;
      const res = await this.ticketRepository.findByIdAndUpdate(
        { _id: id },
        { $pull: { associateAssets: assetId } }
      );

      const response = successResponse(
        HttpStatus.OK,
        `Asset Detached Successfully`,
        res
      );

      return response;
    } catch (error) {
      const err = errorResponse(HttpStatus.BAD_REQUEST, error?.meta?.cause);
      return err;
    }
  }
  async createChildTicket(payload: any) {
    try {
      const { ticketId, ...dto } = payload;

      const childTicket = await this.ticketRepository.create({
        ...dto,
      });
      const data = await this.ticketRepository.findOneAndUpdate(
        { _id: ticketId },
        { $push: { childTicketsId: childTicket._id } }
      );

      const response = successResponse(
        HttpStatus.CREATED,
        `ChildTicket Created Successfully`,
        data
      );
      return response;
    } catch (error) {
      const err = errorResponse(HttpStatus.BAD_REQUEST, error?.meta?.cause);
      return err;
    }
  }
  async getChildTicket(payload: any) {
    try {
      const { ticketId } = payload;
      const data = await this.ticketRepository.aggregate([
        {
          $lookup: {
            from: 'tickets',
            localField: 'childTicketsId',
            foreignField: '_id',
            as: 'childTicketDetails',
          },
        },

        { $match: { _id: new mongoose.Types.ObjectId(ticketId) } },
      ]);

      const response = successResponse(
        HttpStatus.ACCEPTED,
        `ChildTicket Get Successfully`,
        data
      );

      return response;
    } catch (error) {
      const err = errorResponse(HttpStatus.BAD_REQUEST, error?.meta?.cause);
      // TODO - Add logger
      return err;
    }
  }
}
