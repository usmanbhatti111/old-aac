import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { TaxCalculationRepository } from '@shared';
import { ResponseMessage, successResponse } from '@shared/constants';
import {
  AddTaxDto,
  DeleteTaxsDto,
  GetTaxsDto,
  UpdateTaxDto,
} from '@shared/dto';
import dayjs from 'dayjs';

@Injectable()
export class TaxCalculationService {
  constructor(private taxCalculationRepository: TaxCalculationRepository) {}

  async addTax(payload: AddTaxDto) {
    try {
      const res = await this.taxCalculationRepository.create(payload);

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

  async getTaxs(payload: GetTaxsDto) {
    try {
      const limit = payload?.limit;
      const offset = payload?.page;

      const filterQuery = { isDeleted: false };

      if (payload?.status) {
        filterQuery['status'] = payload.status;
      }

      if (payload?.dateStart && payload?.dateEnd) {
        const startDate = dayjs(payload.dateStart).startOf('day').toDate();
        const endDate = dayjs(payload.dateEnd).endOf('day').toDate();

        filterQuery['createdAt'] = {
          gte: startDate,
          lte: endDate,
        };
      }

      if (payload?.applyOn) {
        filterQuery['applyOn'] = { $in: [payload.applyOn] };
      }

      if (payload?.search) {
        const search = { $regex: payload.search, $options: 'i' };

        filterQuery['$or'] = [
          {
            name: search,
          },
          {
            description: search,
          },
        ];
      }

      const response = await this.taxCalculationRepository.paginate({
        filterQuery,
        offset,
        limit,
      });

      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, response);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async updateTax(payload: UpdateTaxDto) {
    try {
      const { id } = payload;

      const filter = { _id: id, isDeleted: false };

      const res = await this.taxCalculationRepository.findOneAndUpdate(
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

  async deleteTaxs(payload: DeleteTaxsDto) {
    try {
      const ids = payload.ids.split(',');

      const filter = { _id: { $in: ids }, isDeleted: false };
      const data = { isDeleted: true, deletedBy: payload.deletedBy };

      const res = await this.taxCalculationRepository.updateMany(filter, data);

      let message: string;
      if (ids.length === res.modifiedCount) {
        message = `${ids.length > 1 ? 'Records' : 'Record'} has been Deleted`;
      } else {
        message = `${res.modifiedCount} ${
          res.modifiedCount > 1 ? 'Records' : 'Record'
        } has been deleted outoff ${ids.length}`;
      }

      return successResponse(HttpStatus.OK, message);
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
