import { HttpStatus, Injectable } from '@nestjs/common';
import {
  errorResponse,
  successResponse,
  ResponseMessage,
} from '@shared/constants';
import { PurchaseRepository } from '@shared';
import {
  DeletePurchaseOrderDto,
  UpdatePurchaseOrderDto,
  addPurchaseOrderDto,
  IdDTO,
  FilterPurchaseOrderDto,
} from '@shared/dto';
import dayjs from 'dayjs';
import { Types } from 'mongoose';
import { RpcException } from '@nestjs/microservices';
@Injectable()
export class PurchaseOrderService {
  constructor(private purchaseRepository: PurchaseRepository) {}
  async addPurchaseOrder(payload: addPurchaseOrderDto) {
    try {
      if (Array.isArray(payload.purchaseDetails)) {
        let subTotal = 0;
        payload.purchaseDetails.forEach((purchaseDetail) => {
          if (purchaseDetail.costPerItem && purchaseDetail.quantity) {
            subTotal +=
              purchaseDetail.costPerItem * purchaseDetail.quantity +
              (purchaseDetail.taxRate || 0) +
              (purchaseDetail.shipping || 0) -
              (purchaseDetail.discount || 0);
          }
        });
        payload.subTotal = subTotal;
      } else {
        payload.subTotal = 0;
      }

      const res = await this.purchaseRepository.create({ ...payload });
      return successResponse(HttpStatus.CREATED, 'Success', res);
    } catch (error) {
      throw new RpcException(error);
    }
  }
  async deletePurchaseOrder(payload: DeletePurchaseOrderDto) {
    try {
      const { id } = payload;
      const res = await this.purchaseRepository.delete({ _id: id });

      return successResponse(HttpStatus.OK, 'Success', res);
    } catch (error) {
      return errorResponse(HttpStatus.BAD_REQUEST, 'Bad Request', error?.name);
    }
  }
  async updatePurchaseOrder(payload: UpdatePurchaseOrderDto) {
    try {
      const { id } = payload;
      delete payload.id;
      const res = await this.purchaseRepository.findOneAndUpdate(
        { _id: id },
        payload
      );
      return successResponse(HttpStatus.OK, 'Success', res);
    } catch (error) {
      throw new RpcException(error);
    }
  }
  async getPurchaseOrder(payload: IdDTO) {
    try {
      const res = await this.purchaseRepository.findOne({
        _id: payload.id,
      });
      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, res);
    } catch (error) {
      throw new RpcException(error);
    }
  }
  async getPurchaseOrderList(payload: FilterPurchaseOrderDto) {
    try {
      const { page, limit, search, departmentId, vendorId, status } = payload;

      const offset = limit * (page - 1);
      delete payload.page;
      delete payload.limit;
      delete payload.search;
      const createdAtFilter = {};
      const queryId = {};

      const purchaseStatus = {};
      if (departmentId) {
        queryId['departmentId'] = new Types.ObjectId(departmentId);
      }

      if (status) {
        purchaseStatus['status'] = status;
      }
      if (vendorId) {
        queryId['vendorId'] = new Types.ObjectId(vendorId);
      }
      if (payload.createdAt) {
        const startDate = dayjs(payload.createdAt).startOf('day');
        const endDate = dayjs(payload.createdAt).endOf('day');

        createdAtFilter['createdAt'] = {
          gte: startDate.toDate(),
          lte: endDate.toDate(),
        };
        delete payload.createdAt;
      }

      let searchFilter;
      if (search) {
        searchFilter = {
          $or: [
            {
              title: {
                $regex: search,
                $options: 'i',
              },
            },
            {
              description: {
                $regex: search,
                $options: 'i',
              },
            },
          ],
        };
      }

      const filterQuery = {
        ...createdAtFilter,
        ...queryId,
        ...purchaseStatus,
        ...searchFilter,
      };
      const paginateRes = await this.purchaseRepository.paginate({
        filterQuery,
        offset,
        limit,
      });

      return successResponse(
        HttpStatus.OK,
        ResponseMessage.SUCCESS,
        paginateRes
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
