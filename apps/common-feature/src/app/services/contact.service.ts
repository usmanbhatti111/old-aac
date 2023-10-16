import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ContactRepository } from '@shared';
import { ResponseMessage, successResponse } from '@shared/constants';
import { CreateContactDto } from '@shared/dto';

@Injectable()
export class ContactService {
  constructor(private contactRepository: ContactRepository) {}

  notDeletedFilter = {
    isDeleted: false,
  };

  async createContact(payload: CreateContactDto) {
    try {
      const res = await this.contactRepository.create(payload);
      return successResponse(HttpStatus.CREATED, ResponseMessage.CREATED, res);
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
