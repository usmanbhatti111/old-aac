import { HttpStatus, Injectable } from '@nestjs/common';
import {
  MODEL,
  ResponseMessage,
  errorResponse,
  successResponse,
} from '@shared/constants';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IExample } from '@shared/dto';

@Injectable()
export class ExampleService {
  constructor(
    @InjectModel(MODEL.EXAMPLE) private readonly exampleModel: Model<IExample>
  ) {}

  async create(payload: any) {
    try {
      const res = await this.exampleModel.create({ ...payload });
      return successResponse(HttpStatus.CREATED, ResponseMessage.CREATED, res);
    } catch (error) {
      return errorResponse(
        HttpStatus.BAD_REQUEST,
        ResponseMessage.BAD_REQUEST,
        error?.name
      );
    }
  }

  async list(params: any) {
    try {
      const { page, limit } = params;
      const res = await this.exampleModel
        .find({})
        .limit(limit * 1)
        .skip((page - 1) * limit);
      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, res);
    } catch (error) {
      return errorResponse(
        HttpStatus.BAD_REQUEST,
        ResponseMessage.BAD_REQUEST,
        error?.name
      );
    }
  }

  async update(payload: any) {
    try {
      const { id } = payload;
      const res = await this.exampleModel.findByIdAndUpdate(id, { ...payload });
      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, res);
    } catch (error) {
      return errorResponse(
        HttpStatus.BAD_REQUEST,
        ResponseMessage.BAD_REQUEST,
        error?.name
      );
    }
  }
}
