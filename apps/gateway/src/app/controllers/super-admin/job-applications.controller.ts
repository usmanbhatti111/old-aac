import {
  Body,
  Controller,
  Inject,
  Post,
  Req,
  UploadedFiles,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiFormData } from '@shared';
import {
  API_ENDPOINTS,
  API_TAGS,
  CONTROLLERS,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';
import { CreateJobApplicationDto } from '@shared/dto';
import { firstValueFrom } from 'rxjs';
import { Auth } from '../../decorators/auth.decorator';
import { AppRequest } from '../../shared/interface/request.interface';

@ApiBearerAuth()
@ApiTags(API_TAGS.JOB_APPLICATIONS)
@Controller(CONTROLLERS.JOB_APPLICATIONS)
export class JobApplicationsController {
  constructor(
    @Inject(SERVICES.SUPER_ADMIN)
    private superAdminService: ClientProxy
  ) {}

  @Auth(true)
  @Post(API_ENDPOINTS.SUPER_ADMIN.JOB_APPLICATIONS.CREATE_JOB_APPLICATION)
  @ApiFormData({
    required: false,
    multiple: true,
    fieldNames: ['resume', 'coverLetter'],
    fileTypes: ['jpg', 'png', 'jpeg'],
    maxCount: 1,
    errorMessage: 'Invalid document file entered.',
  })
  // @ApiCreatedResponse({ type: AddNewsOrEventResponseDto })
  public async createJobApplication(
    @Req() request: AppRequest,
    @Body() payload: CreateJobApplicationDto,
    @UploadedFiles() files: any
  ): Promise<any> {
    payload.createdBy = request?.user?._id;
    payload.files = files;

    const response = await firstValueFrom(
      this.superAdminService.send(
        RMQ_MESSAGES.SUPER_ADMIN.JOB_APPLICATIONS.CREATE_JOB_APPLICATION,
        payload
      )
    );

    return response;
  }
}
