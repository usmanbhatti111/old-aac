import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import { ContractService } from '../../services/assets/contract.service';
import {
  UpdateContractDTO,
  ExtendRenewContractDTO,
  GetContactsDto,
  CreateContractDTO,
  IdDto,
  AddAssetToContractDto,
  DeleteAssetToContractDto,
} from '@shared/dto';
@Controller()
export class ContractController {
  constructor(private contractService: ContractService) {}

  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.CONTRACT.ADD_CONTRACT)
  addContract(@Payload() payload: CreateContractDTO) {
    return this.contractService.addContract(payload);
  }
  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.CONTRACT.DELETE_CONTRACT)
  deleteContract(@Payload() payload: { ids: string[] }) {
    return this.contractService.deleteContract(payload);
  }
  @MessagePattern({
    cmd: RMQ_MESSAGES.AIR_SERVICES.CONTRACT.UPDATE_CONTRACT,
  })
  async updateContract(@Payload() payload: UpdateContractDTO) {
    return await this.contractService.updateContract(payload);
  }
  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.CONTRACT.ADD_CONTRACTS_ASSET)
  addContractsAsset(
    @Payload() payload: { id: IdDto; contractIds: AddAssetToContractDto }
  ) {
    return this.contractService.addContractsAsset(payload);
  }
  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.CONTRACT.DELETE_CONTRACTS_ASSET)
  deleteContractsAsset(
    @Payload() payload: { id: IdDto; assetsIds: DeleteAssetToContractDto }
  ) {
    return this.contractService.deleteContractsAsset(payload);
  }
  @MessagePattern({
    cmd: RMQ_MESSAGES.AIR_SERVICES.CONTRACT.RENEW_EXTEND_CONTRACT,
  })
  async renewContract(@Payload() payload: ExtendRenewContractDTO) {
    return await this.contractService.updateContract(payload);
  }
  @MessagePattern(RMQ_MESSAGES.AIR_SERVICES.CONTRACT.GET_CONTRACTS)
  getContracts(@Payload() payload: GetContactsDto) {
    return this.contractService.getContracts(payload);
  }
}
