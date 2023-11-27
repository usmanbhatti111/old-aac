import {
  Controller,
  Inject,
  Req,
  Get,
  Query,
  Post,
  Res,
  Body,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import {
  API_ENDPOINTS,
  API_TAGS,
  CONTROLLERS,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';
import { Auth } from '../../../../decorators/auth.decorator';
import { AppRequest } from '../../../../shared/interface/request.interface';
import { firstValueFrom } from 'rxjs';
import { AddVendorDTO, ListVendorsDto } from '@shared/dto';

@ApiBearerAuth()
@ApiTags(API_TAGS.VENDORS)
@Controller(CONTROLLERS.VENDORS)
export class VendorController {
  constructor(
    @Inject(SERVICES.AIR_SERVICES) private airServiceClient: ClientProxy
  ) {}

  @Auth(true)
  @Post(API_ENDPOINTS.AIR_SERVICES.VENDORS.ADD_VENDORS)
  public async addTask(
    @Body() payload: AddVendorDTO,
    @Req() request: AppRequest,
    @Res() res: Response | any
  ) {
    try {
      payload.companyId = request?.user?.companyId;
      const response = await firstValueFrom(
        this.airServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.VENDORS.ADD_VENDORS,
          payload
        )
      );

      return res.status(response.statusCode).json(response);
    } catch (error) {
      return res.status(error.statusCode).json(error);
    }
  }

  @Auth(true)
  @Get(API_ENDPOINTS.AIR_SERVICES.VENDORS.GET_VENDORS)
  public async getVendors(@Query() ListVendorsDto: ListVendorsDto) {
    try {
      const response = await firstValueFrom(
        this.airServiceClient.send(
          RMQ_MESSAGES.AIR_SERVICES.VENDORS.GET_VENDORS,
          ListVendorsDto
        )
      );

      return response;
    } catch (err) {
      throw new RpcException(err);
    }
  }
}
