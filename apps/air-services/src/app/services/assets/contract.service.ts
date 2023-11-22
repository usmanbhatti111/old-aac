import { HttpStatus, Injectable } from '@nestjs/common';
import { EContractStatus, successResponse } from '@shared/constants';
import {
  ContractRepository,
  InventoryRepository,
  mongooseDateFilter,
} from '@shared';
import { RpcException } from '@nestjs/microservices';
import {
  ExtendRenewContractDTO,
  UpdateContractDTO,
  GetContactsDto,
} from '@shared/dto';
import mongoose from 'mongoose';

@Injectable()
export class ContractService {
  constructor(
    private contractRepository: ContractRepository,
    private inventoryRepository: InventoryRepository
  ) {}

  async addContract(payload: any) {
    try {
      const res = await this.contractRepository.create({ ...payload });
      return successResponse(HttpStatus.CREATED, 'Success', res);
    } catch (error) {
      throw new RpcException(error);
    }
  }
  async updateSubmittedApproval(payload) {
    try {
      const { id } = payload;
      const response = await this.contractRepository.findOneAndUpdate(
        { _id: id },
        {
          $set: { isSubmitted: true, status: EContractStatus.PENDING_APPROVAL },
        }
      );
      return successResponse(
        HttpStatus.OK,
        'Contract has sent for Approval',
        response
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }
  async approveContract(payload) {
    try {
      const { id } = payload;
      const response = await this.contractRepository.findOneAndUpdate(
        { _id: id, isSubmitted: true },
        { $set: { status: EContractStatus.APPROVED } }
      );
      return successResponse(
        HttpStatus.OK,
        'Contract approved successfully',
        response
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }
  async addContractsAsset(payload) {
    try {
      const { id, contractIds } = payload;
      const response = await this.inventoryRepository.updateMany(
        { _id: { $in: contractIds } },
        { $push: { contractIds: id } }
      );
      return successResponse(HttpStatus.OK, 'Success', response);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async deleteContractsAsset(payload) {
    try {
      const { id, assetsIds } = payload;
      const response = await this.inventoryRepository.updateMany(
        { _id: { $in: assetsIds } },
        { $pull: { contractIds: id } }
      );
      return successResponse(HttpStatus.OK, 'Success', response);
    } catch (error) {
      throw new RpcException(error);
    }
  }
  async deleteContract(payload: { ids: string[] }) {
    try {
      const res = await this.contractRepository.deleteMany({}, payload.ids);

      return successResponse(HttpStatus.OK, 'Success', res);
    } catch (error) {
      throw new RpcException(error);
    }
  }
  async updateContract(payload: UpdateContractDTO | ExtendRenewContractDTO) {
    try {
      const { id } = payload;
      delete payload.id;

      const res = await this.contractRepository.findOneAndUpdate(
        { _id: id },
        payload
      );

      return successResponse(HttpStatus.OK, 'Success', res);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getContracts(payload: GetContactsDto) {
    try {
      const { page, limit, status, search, expiry, assetId } = payload;
      const filterQuery = {};
      const searchFilter = {};
      let expiryFilter = {};
      let pipelines: any = [
        {
          $lookup: {
            from: 'attachments',
            localField: 'attachments',
            foreignField: '_id',
            as: 'attachmentDetails',
          },
        },
        {
          $unwind: {
            path: '$attachmentDetails',
            preserveNullAndEmptyArrays: true,
          },
        },
      ];

      if (status) {
        filterQuery['status'] = status;
      }
      if (search) {
        searchFilter['$or'] = [
          { name: { $regex: search, $options: 'i' } },
          { contractNumber: { $regex: search, $options: 'i' } },
          { status: { $regex: search, $options: 'i' } },
          { cost: { $regex: search, $options: 'i' } },
        ];
        pipelines.push({ $match: searchFilter });
      }
      if (assetId) {
        filterQuery['assetId'] = new mongoose.Types.ObjectId(assetId);
        pipelines = [
          ...pipelines,
          {
            $lookup: {
              from: 'assetssoftwares',
              localField: 'assetId',
              foreignField: '_id',
              as: 'assetDetails',
            },
          },
          {
            $unwind: {
              path: '$assetDetails',
              preserveNullAndEmptyArrays: true,
            },
          },
        ];
      }
      if (expiry) {
        expiryFilter = mongooseDateFilter(expiry, 'endDate');
        pipelines.push({ $match: expiryFilter });
      }
      const response = await this.contractRepository.paginate({
        filterQuery,
        offset: page,
        limit,
        pipelines,
      });

      return successResponse(HttpStatus.CREATED, 'Success', response);
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
