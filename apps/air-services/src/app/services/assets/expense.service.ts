import { HttpStatus, Injectable } from '@nestjs/common';
import { errorResponse, successResponse } from '@shared/constants';
import { ExpenseRepository } from '@shared';

@Injectable()
export class ExpenseService {
  constructor(private expenseRepository: ExpenseRepository) {}

  async addExpense(payload: any) {
    try {
      const res = await this.expenseRepository.create({ ...payload });
      return successResponse(HttpStatus.CREATED, 'Success', res);
    } catch (error) {
      return errorResponse(HttpStatus.BAD_REQUEST, 'Bad Request', error?.name);
    }
  }
  async getExpense() {
    try {
      const res = await this.expenseRepository.find();
      return successResponse(HttpStatus.CREATED, 'Success', res);
    } catch (error) {
      return errorResponse(HttpStatus.BAD_REQUEST, 'Bad Request', error?.name);
    }
  }
}
