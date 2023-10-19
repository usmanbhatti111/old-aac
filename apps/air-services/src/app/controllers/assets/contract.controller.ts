import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import { ContractService } from '../../services/assets/contract.service';
import { GetContactsDto } from '@shared/dto';
@Controller()
export class ContractController {
  constructor(private contractService: ContractService) { }

  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.CONTRACT.ADD_CONTRACT)
  addContract(@Payload() payload: any) {
    return this.contractService.addContract(payload);
  }
  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.CONTRACT.GET_CONTRACTS)
  getContracts(@Payload() payload: GetContactsDto) {
    return this.contractService.getContracts(payload);
  }
}
