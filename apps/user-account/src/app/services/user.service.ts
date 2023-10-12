import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserRepository } from '@shared';
import { ResponseMessage, successResponse } from '@shared/constants';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    private userReposity: UserRepository,
    @InjectModel('User') private readonly exampleModel: Model<User>
  ) {}

  async create(payload: User) {
    try {
      return successResponse(
        HttpStatus.OK,
        ResponseMessage.SUCCESS,
        await this.userReposity.create(payload)
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async loggedInUser(payload: { email: string }) {
    try {
      return successResponse(
        HttpStatus.OK,
        ResponseMessage.SUCCESS,
        await this.exampleModel
          .findOne({ ...payload })
          .populate('products organization')
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async findUserByUniqueFields(payload: {
    _id?: string;
    email?: string;
    cognitoId?: string;
  }) {
    try {
      return successResponse(
        HttpStatus.OK,
        ResponseMessage.SUCCESS,
        await this.userReposity.findOne(
          { ...payload },
          '_id firstName middleName lastName role products organization'
        )
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
