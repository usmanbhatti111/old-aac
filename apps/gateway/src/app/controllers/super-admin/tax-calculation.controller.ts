import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import {
  API_ENDPOINTS,
  API_TAGS,
  CONTROLLERS,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';

import { ClientProxy } from '@nestjs/microservices';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  AddTaxDto,
  AddTaxResponseDto,
  DeleteTaxsDto,
  DeleteTaxsResponseDto,
  GetTaxsDto,
  GetTaxsResponseDto,
  IdDto,
  UpdateTaxDto,
  UpdateTaxResponseDto,
} from '@shared/dto';
import { firstValueFrom } from 'rxjs';
import { Auth } from '../../decorators/auth.decorator';
import { AppRequest } from '../../shared/interface/request.interface';

@ApiBearerAuth()
@ApiTags(API_TAGS.TAX_CALCULATION)
@Controller(CONTROLLERS.TAX_CALCULATION)
export class TaxCalculationController {
  constructor(
    @Inject(SERVICES.SUPER_ADMIN)
    private superAdminService: ClientProxy
  ) {}

  @Auth(true)
  @Post(API_ENDPOINTS.SUPER_ADMIN.TAX_CALCULATION.ADD_TAX)
  @ApiCreatedResponse({ type: AddTaxResponseDto })
  public async addTax(@Req() request: AppRequest, @Body() payload: AddTaxDto) {
    payload.createdBy = request?.user?._id;

    const response = await firstValueFrom(
      this.superAdminService.send(
        RMQ_MESSAGES.SUPER_ADMIN.TAX_CALCULATIONS.ADD_TAX,
        payload
      )
    );

    return response;
  }

  @Auth(true)
  @Get(API_ENDPOINTS.SUPER_ADMIN.TAX_CALCULATION.GET_TAXS)
  @ApiOkResponse({ type: GetTaxsResponseDto })
  public async getTaxs(@Query() payload: GetTaxsDto) {
    const response = await firstValueFrom(
      this.superAdminService.send(
        RMQ_MESSAGES.SUPER_ADMIN.TAX_CALCULATIONS.GET_TAXS,
        payload
      )
    );

    return response;
  }

  @Auth(true)
  @Patch(API_ENDPOINTS.SUPER_ADMIN.TAX_CALCULATION.UPDATE_TAX)
  @ApiOkResponse({ type: UpdateTaxResponseDto })
  public async updateTax(
    @Req() request: AppRequest,
    @Param() params: IdDto,
    @Body() payload: UpdateTaxDto
  ) {
    payload.updatedBy = request?.user?._id;
    payload.id = params.id;

    const response = await firstValueFrom(
      this.superAdminService.send(
        RMQ_MESSAGES.SUPER_ADMIN.TAX_CALCULATIONS.UPDATE_TAX,
        payload
      )
    );

    return response;
  }

  @Auth(true)
  @Delete(API_ENDPOINTS.SUPER_ADMIN.TAX_CALCULATION.DELETE_TAXS)
  @ApiOkResponse({ type: DeleteTaxsResponseDto })
  public async deleteTaxs(
    @Req() request: AppRequest,
    @Param() payload: DeleteTaxsDto
  ) {
    payload.deletedBy = request?.user?._id;

    const response = await firstValueFrom(
      this.superAdminService.send(
        RMQ_MESSAGES.SUPER_ADMIN.TAX_CALCULATIONS.DELETE_TAXS,
        payload
      )
    );

    return response;
  }
}
