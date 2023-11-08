import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import { TaxCalculationService } from '../services/tax-calculation.service';
import {
  AddTaxDto,
  DeleteTaxsDto,
  GetTaxsDto,
  UpdateTaxDto,
} from '@shared/dto';

@Controller()
export class TaxCalculationController {
  constructor(private readonly taxCalculationService: TaxCalculationService) {}

  @MessagePattern(RMQ_MESSAGES.SUPER_ADMIN.TAX_CALCULATIONS.ADD_TAX)
  addTax(@Payload() payload: AddTaxDto) {
    return this.taxCalculationService.addTax(payload);
  }

  @MessagePattern(RMQ_MESSAGES.SUPER_ADMIN.TAX_CALCULATIONS.GET_TAXS)
  getTaxs(@Payload() payload: GetTaxsDto) {
    return this.taxCalculationService.getTaxs(payload);
  }

  @MessagePattern(RMQ_MESSAGES.SUPER_ADMIN.TAX_CALCULATIONS.UPDATE_TAX)
  updateTax(@Payload() payload: UpdateTaxDto) {
    return this.taxCalculationService.updateTax(payload);
  }

  @MessagePattern(RMQ_MESSAGES.SUPER_ADMIN.TAX_CALCULATIONS.DELETE_TAXS)
  deleteTaxs(@Payload() payload: DeleteTaxsDto) {
    return this.taxCalculationService.deleteTaxs(payload);
  }
}
