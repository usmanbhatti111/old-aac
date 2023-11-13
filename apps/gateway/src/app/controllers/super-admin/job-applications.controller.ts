import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFiles,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiFormData } from '@shared';
import {
  API_ENDPOINTS,
  API_TAGS,
  CONTROLLERS,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';
import {
  CreateJobApplicationDto,
  CreateJobApplicationResponseDto,
  EditJobApplicationResponseDto,
  EditJobApplicationsDto,
  GetJobApplicationsDto,
  GetJobApplicationsResponseDto,
  IdDto,
} from '@shared/dto';
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
  @ApiCreatedResponse({ type: CreateJobApplicationResponseDto })
  public async createJobApplication(
    @Req() request: AppRequest,
    @Body() payload: CreateJobApplicationDto,
    @UploadedFiles() files: any
  ): Promise<CreateJobApplicationResponseDto> {
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

  @Auth(true)
  @Get(API_ENDPOINTS.SUPER_ADMIN.JOB_APPLICATIONS.GET_JOB_APPLICATIONS)
  @ApiOkResponse({ type: GetJobApplicationsResponseDto })
  public async getJobApplications(
    @Query() payload: GetJobApplicationsDto
  ): Promise<GetJobApplicationsResponseDto> {
    const response = await firstValueFrom(
      this.superAdminService.send(
        RMQ_MESSAGES.SUPER_ADMIN.JOB_APPLICATIONS.GET_JOB_APPLICATIONS,
        payload
      )
    );

    return response;
  }

  @Auth(true)
  @Patch(API_ENDPOINTS.SUPER_ADMIN.JOB_APPLICATIONS.EDIT_JOB_APPLICATION)
  @ApiOkResponse({ type: EditJobApplicationResponseDto })
  public async editJobApplication(
    @Req() request: AppRequest,
    @Param() params: IdDto,
    @Body() payload: EditJobApplicationsDto
  ): Promise<EditJobApplicationResponseDto> {
    payload.updatedBy = request?.user?._id;
    payload.id = params.id;

    const response = await firstValueFrom(
      this.superAdminService.send(
        RMQ_MESSAGES.SUPER_ADMIN.JOB_APPLICATIONS.EDIT_JOB_APPLICATION,
        payload
      )
    );

    return response;
  }
}
