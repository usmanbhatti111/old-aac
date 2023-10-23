import { Injectable, HttpStatus } from '@nestjs/common';
import { errorResponse, successResponse } from '@shared/constants';
import { TicketRepository } from '@shared';
import mongoose from 'mongoose';
import {
  AssociateAssetsDTO,
  ListTicketDTO,
  IdDto,
  paginationDTO,
} from '@shared/dto';
import { Types } from 'mongoose';
import { GetAssociateAssetsDto, GetTicketByIdDto } from '@shared/dto';
import { RpcException } from '@nestjs/microservices';
import { DetachAssetsDTO } from '@shared/dto';

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

  async getTicketDetails(payload: GetTicketByIdDto) {
    try {
      const res = await this.ticketRepository.findOne({
        _id: payload?.ticketId,
      });
      return successResponse(HttpStatus.OK, `Success`, res);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getAssociateAssets(payload: GetAssociateAssetsDto) {
    try {
      const { page, limit } = payload;
      const filterQuery = { _id: new Types.ObjectId(payload?.ticketId) };
      const pipeline = [
        {
          $lookup: {
            from: 'assets',
            localField: 'associateAssets',
            foreignField: '_id',
            as: 'associateAssets',
          },
        },
        {
          $unwind: {
            path: '$associateAssets',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            associateAssets: 1,
          },
        },
      ];
      const response = await this.ticketRepository.newPaginate(
        filterQuery,
        pipeline,
        { page, limit }
      );
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

  async addAssociatePurchaseOrder(payload) {
    try {
      const { id, ticketsIds } = payload;
      const updatedTickets = await this.ticketRepository.updateMany(
        { _id: { $in: ticketsIds } },
        { $set: { associatePurchaseOrders: id } }
      );
      const response = successResponse(
        HttpStatus.OK,
        'Success',
        updatedTickets
      );
      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async dissociatePurchaseOrder(payload) {
    try {
      const { id, purchaseOrderId } = payload;
      const res = await this.ticketRepository.findByIdAndUpdate(
        { _id: id },
        {
          $pull: {
            associatePurchaseOrders: purchaseOrderId.associateOrderId,
          },
        }
      );

      const response = successResponse(
        HttpStatus.OK,
        `Asset Detached Successfully`,
        res
      );

      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async createChildTicket(payload: any) {
    try {
      const { ticketId, ...dto } = payload;
      const { id } = ticketId;
      const childTicket = await this.ticketRepository.create({
        isChildTicket: true,
        ...dto,
      });
      const data = await this.ticketRepository.findOneAndUpdate(
        { _id: id },

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
  async getChildTicket(payload: { id: IdDto; pagination: paginationDTO }) {
    try {
      const { id, pagination } = payload;

      const limit = pagination.limit;
      const offset = pagination.page;
      const pipelines = [
        { $match: { _id: new mongoose.Types.ObjectId(id.id) } },
        {
          $lookup: {
            from: 'tickets',
            localField: 'childTicketsId',
            foreignField: '_id',
            as: 'childTicketDetails',
          },
        },
        {
          $project: {
            childTicketDetails: 1,
          },
        },
        {
          $unwind: '$childTicketDetails',
        },
      ];
      const params = {
        pipelines,
        limit,
        offset,
      };
      const data = await this.ticketRepository.paginate(params);
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
      const { id } = payload.id;

      const data = await this.ticketRepository.delete({
        _id: id.id,
        isChildTicket: true,
      });
      //should also remove  from parent ticket
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

  async deleteTickets(payload: any) {
    try {
      const data = await this.ticketRepository.deleteMany({}, payload.ids);
      //should also remove  all the traces
      const response = successResponse(
        HttpStatus.OK,
        `Tickets Deleted Successfully`,
        data
      );
      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async editTicket(payload: any) {
    try {
      const { id, ...dto } = payload;
      const data = await this.ticketRepository.findOneAndUpdate(
        { _id: id.id, isChildTicket: dto.isChildTicket },
        { ...dto }
      );
      const response = successResponse(
        HttpStatus.OK,
        `Ticket Edit Successfully`,
        data
      );
      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async updateTicketStatus(payload: any) {
    try {
      const { id, status } = payload;
      const data = await this.ticketRepository.findOneAndUpdate(
        { _id: id.id },
        { status }
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

  async getTicketList(payload: {
    listTicketDTO: ListTicketDTO;
    columnNames: string[];
  }) {
    try {
      const { limit, page, search } = payload.listTicketDTO;
      const offset = limit * (page - 1);
      const pipeline: any = [{ $project: payload.columnNames }];

      if (search) {
        pipeline.push({
          $match: {
            'details.name': { $regex: search, $options: 'i' },
          },
        });
      }
      const filterQuery = {};
      //TODO attachment code
      const res = await this.ticketRepository.paginate({
        filterQuery,
        offset,
        limit,
        pipelines: pipeline,
      });
      const response = successResponse(HttpStatus.OK, `Retrived`, res);
      // TODO - Add Logger

      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
