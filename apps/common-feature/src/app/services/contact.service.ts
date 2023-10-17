import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ContactRepository, UserRepository } from '@shared';
import { successResponse } from '@shared/constants';
import {
  AssignContactOwnerDto,
  ContactDeleteDto,
  ContactFilterDto,
  CreateContactDto,
  EditContactDto,
} from '@shared/dto';
import dayjs from 'dayjs';

@Injectable()
export class ContactService {
  constructor(
    private contactRepository: ContactRepository,
    private userRepository: UserRepository
  ) {}

  notDeletedFilter = {
    isDeleted: false,
  };

  async createContact(payload: CreateContactDto) {
    try {
      if (payload.contactOwnerId)
        this.userRepository.findOne({
          _id: payload.contactOwnerId,
          status: 'ACTIVE',
        });
      else payload.contactOwnerId = payload.createdBy;

      const res = await this.contactRepository.create(payload);
      return successResponse(
        HttpStatus.CREATED,
        'Contact created successfully',
        res
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getContact(contactId: any) {
    try {
      const res = await this.contactRepository.findOne({
        _id: contactId,
        ...this.notDeletedFilter,
      });
      return successResponse(HttpStatus.OK, 'Contact Get Successfully', res);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getContacts(payload: ContactFilterDto) {
    try {
      const take = payload.limit || 10;
      const page = payload.page || 1;
      const skip = (page - 1) * take;

      const { search } = payload;

      delete payload.page;
      delete payload.limit;
      delete payload.search;
      const createdAtFilter = {};
      if (payload.createdAt) {
        const startDate = dayjs(payload.createdAt).startOf('day');
        const endDate = dayjs(payload.createdAt).endOf('day');

        createdAtFilter['createdAt'] = {
          gte: startDate.toDate(),
          lte: endDate.toDate(),
        };
        delete payload.createdAt;
      }
      if (payload.lastActivityDate) {
        const startDate = dayjs(payload.lastActivityDate).startOf('day');
        const endDate = dayjs(payload.lastActivityDate).endOf('day');

        createdAtFilter['createdAt'] = {
          gte: startDate.toDate(),
          lte: endDate.toDate(),
        };
        delete payload.lastActivityDate;
      }
      if (payload.nextActivityDate) {
        const startDate = dayjs(payload.nextActivityDate).startOf('day');
        const endDate = dayjs(payload.nextActivityDate).endOf('day');

        createdAtFilter['createdAt'] = {
          gte: startDate.toDate(),
          lte: endDate.toDate(),
        };
        delete payload.nextActivityDate;
      }

      let searchFilter = {};
      if (search) {
        searchFilter = {
          $or: [
            {
              firstName: {
                $regex: search,
                $options: 'i', // Optional: Case-insensitive search
              },
            },
            {
              lastName: {
                $regex: search,
                $options: 'i', // Optional: Case-insensitive search
              },
            },
          ],
        };
      }

      const filterQuery = {
        ...createdAtFilter,
        ...payload,
        ...this.notDeletedFilter,
        ...searchFilter,
      };

      const paginateRes = await this.contactRepository.paginate({
        filterQuery,
        offset: skip,
        limit: payload.limit,
      });

      return successResponse(
        HttpStatus.OK,
        'Contacts Get Successfully',
        paginateRes
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async editContact(payload: EditContactDto) {
    try {
      const { contactId } = payload;
      await this.contactRepository.findOne({
        _id: contactId,
        ...this.notDeletedFilter,
      });

      if (payload.contactOwnerId)
        this.userRepository.findOne({
          _id: payload.contactOwnerId,
          status: 'ACTIVE',
        });

      delete payload.contactId;
      const payloadPlan = {
        ...payload,
        updatedAt: Date.now(),
      };

      const res = await this.contactRepository.findOneAndUpdate(
        { _id: contactId },
        payloadPlan
      );
      return successResponse(
        HttpStatus.CREATED,
        'Contact Updated Successfully',
        res
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async assignContactOwner(payload: AssignContactOwnerDto) {
    try {
      const { contactId } = payload;
      await this.contactRepository.findOne({
        _id: contactId,
        ...this.notDeletedFilter,
      });

      if (payload.contactOwnerId)
        this.userRepository.findOne({
          _id: payload.contactOwnerId,
          status: 'ACTIVE',
        });

      delete payload.contactId;
      const payloadPlan = {
        ...payload,
        updatedAt: Date.now(),
      };

      const res = await this.contactRepository.findOneAndUpdate(
        { _id: contactId, ...this.notDeletedFilter },
        payloadPlan
      );
      return successResponse(
        HttpStatus.CREATED,
        'Contact Updated Successfully',
        res
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async deleteContact(payload: ContactDeleteDto) {
    try {
      const { deletedBy, contactId } = payload;

      await this.contactRepository.findOneAndUpdate(
        { _id: contactId, ...this.notDeletedFilter },
        { isDeleted: true, deletedAt: Date.now(), deletedBy }
      );

      return successResponse(
        HttpStatus.CREATED,
        'Contact Deleted Successfully',
        {}
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
