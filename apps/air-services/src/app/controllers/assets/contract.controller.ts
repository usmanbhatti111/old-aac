import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import { ContractService } from '../../services/assets/contract.service';
@Controller()
export class ContractController {
  constructor(private contractService: ContractService) {}

  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.CONTRACT.ADD_CONTRACT)
  addExpense(@Payload() payload: any) {
    return this.contractService.addContract(payload);
  }
}
