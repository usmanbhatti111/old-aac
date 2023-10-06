import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  MODEL,
  ResponseMessage,
  errorResponse,
  successResponse,
} from '@shared/constants';
import { Model } from 'mongoose';

import { IListResponseDto, IUserListResponseDto } from '@shared/dto';
import { SuperAdmin } from '@shared/schemas';

interface Person {
  firstName: string;
  email: string;
}

@Injectable()
export class SuperAdminService {
  constructor(
    @InjectModel(MODEL.EXAMPLE)
    private readonly superAdminModel: Model<SuperAdmin>
  ) {}

  async addUser(payload): Promise<IUserListResponseDto> {
    try {
      const user = await this.superAdminModel.create({
        data: payload,
      });
      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, user);
    } catch (error) {
      return errorResponse(
        HttpStatus.BAD_REQUEST,
        ResponseMessage.BAD_REQUEST,
        error?.name
      );
    }
  }

  async userList(query): Promise<IListResponseDto> {
    try {
      const [users, count] = await Promise.all([
        this.superAdminModel.find({ where: query }),
        this.superAdminModel.count(),
      ]);

      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, {
        users,
        count,
      });
    } catch (error) {
      return errorResponse(
        HttpStatus.BAD_REQUEST,
        ResponseMessage.BAD_REQUEST,
        error?.name
      );
    }
  }

  async userProfile(userId): Promise<IListResponseDto> {
    try {
      const user = await this.superAdminModel.findOne({
        where: { id: userId },
      });

      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, user);
    } catch (error) {
      return errorResponse(
        HttpStatus.BAD_REQUEST,
        ResponseMessage.BAD_REQUEST,
        error?.name
      );
    }
  }

  async updateProfile(userId, payload): Promise<IListResponseDto> {
    try {
      const user = await this.superAdminModel.updateOne({
        where: { id: userId },
        data: payload,
      });
      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, user);
    } catch (error) {
      return errorResponse(
        HttpStatus.BAD_REQUEST,
        ResponseMessage.SUCCESS,
        error?.name
      );
    }
  }

  async addAccounts(payload): Promise<IListResponseDto> {
    try {
      const user = await this.superAdminModel.create({
        data: payload,
      });
      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, user);
    } catch (error) {
      return errorResponse(
        HttpStatus.BAD_REQUEST,
        ResponseMessage.BAD_REQUEST,
        error?.name
      );
    }
  }

  async accountList(payload): Promise<IListResponseDto> {
    try {
      const { firstName, email } = payload;
      let whereObject: Person;
      if (firstName) {
        whereObject.firstName = firstName;
      }
      if (email) {
        whereObject.email = email;
      }
      const users = await this.superAdminModel.find({
        where: whereObject,
      });
      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, users);
    } catch (error) {
      return errorResponse(
        HttpStatus.BAD_REQUEST,
        ResponseMessage.BAD_REQUEST,
        error?.name
      );
    }
  }

  async updateAccount(userId, payload): Promise<IListResponseDto> {
    try {
      const user = await this.superAdminModel.updateOne({
        where: { id: userId },
        data: payload,
      });
      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, user);
    } catch (error) {
      return errorResponse(
        HttpStatus.BAD_REQUEST,
        ResponseMessage.BAD_REQUEST,
        error?.name
      );
    }
  }
}
