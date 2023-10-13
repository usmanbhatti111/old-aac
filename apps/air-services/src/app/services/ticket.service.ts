import { Injectable, HttpStatus } from '@nestjs/common';
import { errorResponse, successResponse } from '@shared/constants';
import { TicketRepository } from '@shared';
import mongoose, { Types } from 'mongoose';
import { AssociateAssetsDTO, GetAssociateAssetsDto, GetTicketByIdDto, IdDto } from '@shared/dto';
import { RpcException } from '@nestjs/microservices';
import { DetachAssetsDTO } from '@shared/dto';

@Injectable()
export class TicketService {
  constructor(private ticketRepository: TicketRepository) { }

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


  async getTicketDetails(payload: GetTicketByIdDto) {
    try {
      const res = await this.ticketRepository.findOne({ _id: payload?.ticketId });
      return successResponse(HttpStatus.OK, `Success`, res);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getAssociateAssets(payload: GetAssociateAssetsDto) {
    try {
      const { page, limit } = payload
      const filterQuery = { _id: new Types.ObjectId(payload?.ticketId) }
      const pipeline = [
        {
          '$lookup': {
            'from': 'assets',
            'localField': 'associateAssets',
            'foreignField': '_id',
            'as': 'associateAssets'
          }
        }, {
          '$unwind': {
            'path': '$associateAssets',
            'preserveNullAndEmptyArrays': true
          }
        },
        {
          '$project': {
            'associateAssets': 1
          }
        }
      ]
      const response = await this.ticketRepository.newPaginate(filterQuery, pipeline, { page, limit });
      return successResponse(HttpStatus.OK, `Success`, response);
    } catch (error) {
      throw new RpcException(error);
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
      throw new RpcException(error);
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
      const { id, ...dto } = payload;

      const childTicket = await this.ticketRepository.create({
        isChildTicket: true,
        ...dto,
      });
      const data = await this.ticketRepository.findOneAndUpdate(
        { _id: id.id },

        { $push: { childTicketsId: childTicket._id } }
      );

      const response = successResponse(
        HttpStatus.CREATED,
        `ChildTicket Created Successfully`,
        data
      );
      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }
  async getChildTicket(payload: IdDto) {
    try {
      const { id } = payload;
      const data = await this.ticketRepository.aggregate([
        {
          $lookup: {
            from: 'tickets',
            localField: 'childTicketsId',
            foreignField: '_id',
            as: 'childTicketDetails',
          },
        },

        { $match: { _id: new mongoose.Types.ObjectId(id) } },
      ]);

      const response = successResponse(
        HttpStatus.ACCEPTED,
        `ChildTicket Get Successfully`,
        data
      );

      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async deleteChildTicket(payload: any) {
    try {
      const { id } = payload;

      const data = await this.ticketRepository.delete({
        _id: id,
        isChildTicket: true,
      });
      const response = successResponse(
        HttpStatus.OK,
        `ChildTicket Deleted Successfully`,
        data
      );
      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }
  async editChildTicket(payload: any) {
    try {
      const { id, ...dto } = payload;

      const data = await this.ticketRepository.findOneAndUpdate(
        { _id: id.id, isChildTicket: true },
        { ...dto }
      );
      const response = successResponse(
        HttpStatus.OK,
        `ChildTicket Edit Successfully`,
        data
      );
      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
