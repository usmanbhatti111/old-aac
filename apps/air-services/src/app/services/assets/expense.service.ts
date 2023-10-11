import { HttpStatus, Injectable } from '@nestjs/common';
import { MODEL, errorResponse, successResponse } from '@shared/constants';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectModel(MODEL.EXPENSE) private readonly expenseModel: Model<any>
  ) {}

  async addExpense(payload: any) {
    try {
      const res = await this.expenseModel.create({ ...payload });
      return successResponse(HttpStatus.CREATED, 'Success', res);
    } catch (error) {
      return errorResponse(HttpStatus.BAD_REQUEST, 'Bad Request', error?.name);
    }
  }
  async getExpense() {
    try {
      const res = await this.expenseModel.find();
      return successResponse(HttpStatus.CREATED, 'Success', res);
    } catch (error) {
      return errorResponse(HttpStatus.BAD_REQUEST, 'Bad Request', error?.name);
    }
  }
}
