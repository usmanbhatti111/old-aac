import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ContactStateRepository } from '@shared';
import { ResponseMessage, successResponse } from '@shared/constants';
import {
  AddContactStatusDto,
  DeleteContactStatusDto,
  EditContactStatusDto,
  GetContactStatusesDto,
  IdDto,
} from '@shared/dto';
import mongoose from 'mongoose';

@Injectable()
export class ContactStatusService {
  constructor(private contactStateRepository: ContactStateRepository) {}

  async addContactStatus(payload: AddContactStatusDto) {
    try {
      const res = await this.contactStateRepository.create(payload);
      return successResponse(HttpStatus.CREATED, ResponseMessage.CREATED, res);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getContactStatuses(payload: GetContactStatusesDto) {
    try {
      const { status, search, userId } = payload;

      const filterQuery = { isDeleted: false };

      // get contact statuses related to specific organization
      if (userId) {
        filterQuery['createdBy'] = new mongoose.Types.ObjectId(userId);
      }

      if (status) {
        filterQuery['status'] = status;
      }

      if (search) {
        filterQuery['$or'] = [
          {
            name: { $regex: search, $options: 'i' },
            description: { $regex: search, $options: 'i' },
          },
        ];
      }

      const limit = payload?.limit || 10;
      const offset = payload?.page || 1;

      const res = await this.contactStateRepository.paginate({
        filterQuery,
        offset,
        limit,
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

  async getContactStatus(payload: IdDto) {
    try {
      const { id } = payload;

      const filter = { _id: id };

      const res = await this.contactStateRepository.findOne(filter);

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

  async editContactStatus(payload: EditContactStatusDto) {
    try {
      const { id } = payload;

      const filter = { _id: id };

      const res = await this.contactStateRepository.findOneAndUpdate(
        filter,
        payload
      );

      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, res);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async deleteContactStatus(payload: DeleteContactStatusDto) {
    try {
      const { id, deletedBy } = payload;

      const filter = { _id: id };

      const data = { isDeleted: true, deletedBy };

      await this.contactStateRepository.findOneAndUpdate(filter, data);

      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, {});
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
