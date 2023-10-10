import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import { ExpenseService } from '../../services/assets/expense.service';
import { CreateExpenseDTO } from '@shared/dto';
@Controller()
export class ExpenseController {
  constructor(private expenseService: ExpenseService) {}

  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.EXPENSE.ADD_EXPENSE)
  addExpense(@Payload() payload: CreateExpenseDTO) {
    return this.expenseService.addExpense(payload);
  }
  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.EXPENSE.GET_EXPENSE)
  getExpense() {
    return this.expenseService.getExpense();
  }
}
