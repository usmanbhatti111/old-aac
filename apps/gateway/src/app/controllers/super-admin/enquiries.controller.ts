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
import { ClientProxy } from '@nestjs/microservices';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  API_ENDPOINTS,
  API_TAGS,
  CONTROLLERS,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';
import {
  AddEnquiryDto,
  AddEnquiryResponseDto,
  DeleteEnquiriesDto,
  DeleteEnquiriesResponseDto,
  GetEnquiriesDto,
  GetEnquiriesResponseDto,
  GetEnquiryResponseDto,
  IdDto,
  UpdateEnquiryDto,
  UpdateEnquiryResponseDto,
} from '@shared/dto';
import { firstValueFrom } from 'rxjs';
import { Auth } from '../../decorators/auth.decorator';
import { AppRequest } from '../../shared/interface/request.interface';

@ApiTags(API_TAGS.ENQUIRIES)
@Controller(CONTROLLERS.ENQUIRIES)
@ApiBearerAuth()
export class EnquiriesController {
  constructor(
    @Inject(SERVICES.SUPER_ADMIN) private superAdminServiceClient: ClientProxy
  ) {}

  @Auth(true)
  @Post(API_ENDPOINTS.SUPER_ADMIN.ENQUIRIES.ADD_ENQUIRY)
  @ApiCreatedResponse({ type: AddEnquiryResponseDto })
  public async addEnquiries(
    @Body() payload: AddEnquiryDto,
    @Req() req: AppRequest
  ): Promise<AddEnquiryResponseDto> {
    payload.createdBy = req.user._id;

    const response = await firstValueFrom(
      this.superAdminServiceClient.send(
        RMQ_MESSAGES.SUPER_ADMIN.ENQUIRIES.ADD_ENQUIRY,
        payload
      )
    );

    return response;
  }

  @Auth(true)
  @Get(API_ENDPOINTS.SUPER_ADMIN.ENQUIRIES.GET_ENQUIRIES)
  @ApiOkResponse({ type: GetEnquiriesResponseDto })
  public async getEnquiries(
    @Query() payload: GetEnquiriesDto
  ): Promise<GetEnquiriesResponseDto> {
    const response = await firstValueFrom(
      this.superAdminServiceClient.send(
        RMQ_MESSAGES.SUPER_ADMIN.ENQUIRIES.GET_ENQUIRIES,
        payload
      )
    );

    return response;
  }

  @Auth(true)
  @Get(API_ENDPOINTS.SUPER_ADMIN.ENQUIRIES.GET_ENQUIRY)
  @ApiOkResponse({ type: GetEnquiryResponseDto })
  public async getEnquiry(
    @Param() payload: IdDto
  ): Promise<GetEnquiryResponseDto> {
    const response = await firstValueFrom(
      this.superAdminServiceClient.send(
        RMQ_MESSAGES.SUPER_ADMIN.ENQUIRIES.GET_ENQUIRY,
        payload
      )
    );

    return response;
  }

  @Auth(true)
  @Patch(API_ENDPOINTS.SUPER_ADMIN.ENQUIRIES.UPDATE_ENQUIRY)
  @ApiOkResponse({ type: UpdateEnquiryResponseDto })
  public async updateEnquiries(
    @Req() request: AppRequest,
    @Param() params: IdDto,
    @Body() payload: UpdateEnquiryDto
  ): Promise<UpdateEnquiryResponseDto> {
    payload.updatedBy = request?.user?._id;
    payload.id = params.id;

    const response = await firstValueFrom(
      this.superAdminServiceClient.send(
        RMQ_MESSAGES.SUPER_ADMIN.ENQUIRIES.UPDATE_ENQUIRY,
        payload
      )
    );

    return response;
  }

  @Auth(true)
  @Delete(API_ENDPOINTS.SUPER_ADMIN.ENQUIRIES.DELETE_ENQUIRY)
  @ApiOkResponse({ type: DeleteEnquiriesResponseDto })
  public async deleteEnquiries(
    @Req() request: AppRequest,
    @Param() payload: DeleteEnquiriesDto
  ): Promise<DeleteEnquiriesResponseDto> {
    payload.deletedBy = request?.user?._id;

    const response = await firstValueFrom(
      this.superAdminServiceClient.send(
        RMQ_MESSAGES.SUPER_ADMIN.ENQUIRIES.DELETE_ENQUIRIES,
        payload
      )
    );

    return response;
  }
}
