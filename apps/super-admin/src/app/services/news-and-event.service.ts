import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { NewsAndEventRepository } from '@shared';
import { ResponseMessage, successResponse } from '@shared/constants';
import {
  AddNewsOrEventDto,
  DeleteNewsOrEventsDto,
  EditNewsOrEventDto,
  GetNewsOrEventsDto,
  IdDto,
} from '@shared/dto';
import dayjs from 'dayjs';

@Injectable()
export class NewsAndEventsService {
  constructor(private newsAndEventRepository: NewsAndEventRepository) {}

  async addNewsOrEvent(payload: AddNewsOrEventDto) {
    try {
      const res = await this.newsAndEventRepository.create(payload);

      const response = successResponse(
        HttpStatus.CREATED,
        ResponseMessage.SUCCESS,
        res
      );
      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getNewsOrEvents(payload: GetNewsOrEventsDto) {
    try {
      const limit = payload?.limit || 10;
      const offset = payload?.page || 1;

      const filterQuery = { isDeleted: false };

      if (payload?.status) {
        filterQuery['status'] = payload.status;
      }

      if (payload?.type) {
        filterQuery['type'] = payload.type;
      }

      if (payload?.dateStart && payload?.dateEnd) {
        const startOfDate = dayjs(payload.dateStart).startOf('day').toDate();
        const endOfDate = dayjs(payload.dateEnd).endOf('day').toDate();

        filterQuery['createdAt'] = { $gte: startOfDate, $lte: endOfDate };
      }

      if (payload?.search) {
        const search = { $regex: payload.search, $options: 'i' };
        const equal = { $eq: payload.search };

        filterQuery['$or'] = [
          {
            name: search,
          },
          {
            type: equal,
          },
          {
            status: equal,
          },
          {
            description: search,
          },
        ];
      }

      const res = await this.newsAndEventRepository.paginate({
        filterQuery,
        limit,
        offset,
      });

      const response = successResponse(
        HttpStatus.OK,
        ResponseMessage.SUCCESS,
        res
      );

      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getNewsOrEvent(payload: IdDto) {
    try {
      const { id } = payload;

      const filter = { _id: id };

      const res = await this.newsAndEventRepository.findOne(filter);

      const response = successResponse(
        HttpStatus.OK,
        ResponseMessage.SUCCESS,
        res
      );

      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async editNewsOrEvent(payload: EditNewsOrEventDto) {
    try {
      const { id } = payload;

      const filter = { _id: id };

      const res = await this.newsAndEventRepository.findOneAndUpdate(
        filter,
        payload
      );

      const response = successResponse(
        HttpStatus.OK,
        ResponseMessage.SUCCESS,
        res
      );

      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async deleteNewsAndEvents(payload: DeleteNewsOrEventsDto) {
    try {
      const ids = payload?.ids?.split(',');

      const filterQuery = { _id: { $in: ids } };
      const updates = {
        isDeleted: true,
        deletedBy: payload?.deletedBy,
      };

      const res = await this.newsAndEventRepository.updateMany(
        filterQuery,
        updates
      );

      let message: string;
      if (ids.length === res.modifiedCount) {
        message = `${ids.length > 1 ? 'Records' : 'Record'} has been Deleted`;
      } else {
        message = `${res.modifiedCount} ${
          res.modifiedCount > 1 ? 'Records' : 'Record'
        } has been deleted outoff ${ids.length}`;
      }

      const response = successResponse(HttpStatus.OK, message);

      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
