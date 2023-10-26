import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import { ExpenseService } from '../../services/assets/expense.service';
import { WriteArticleDTO } from '@shared/dto';
@Controller()
export class KnowledgeBaseController {
  constructor(private expenseService: ExpenseService) {}

  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.EXPENSE.ADD_EXPENSE)
  writeArticle(@Payload() payload: WriteArticleDTO) {
    return this.expenseService.addExpense(payload);
  }

}
