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
  CreateJobDto,
  CreateJobResponseDto,
  DeleteJobsDto,
  DeleteJobsResponseDto,
  GetJobResponseDto,
  GetJobsDto,
  GetJobsResponseDto,
  IdDto,
  UpdateJobDto,
  UpdateJobResponseDto,
} from '@shared/dto';
import { firstValueFrom } from 'rxjs';
import { Auth } from '../../decorators/auth.decorator';
import { AppRequest } from '../../shared/interface/request.interface';

@ApiTags(API_TAGS.JOBS)
@Controller(CONTROLLERS.JOBS)
@ApiBearerAuth()
export class JobsController {
  constructor(
    @Inject(SERVICES.SUPER_ADMIN) private userServiceClient: ClientProxy
  ) {}

  @Auth(true)
  @Post(API_ENDPOINTS.JOBS.CREATE_JOB)
  @ApiCreatedResponse({ type: CreateJobResponseDto })
  public async createJob(
    @Req() request: AppRequest,
    @Body() payload: CreateJobDto
  ) {
    payload.createdBy = request?.user?._id;

    const response = await firstValueFrom(
      this.userServiceClient.send(
        { cmd: RMQ_MESSAGES.JOBS.CREATE_JOB },
        payload
      )
    );

    return response;
  }

  @Auth(true)
  @Get(API_ENDPOINTS.JOBS.GET_JOB)
  @ApiOkResponse({ type: GetJobResponseDto })
  public async getJob(@Param() payload: IdDto) {
    const response = await firstValueFrom(
      this.userServiceClient.send({ cmd: RMQ_MESSAGES.JOBS.GET_JOB }, payload)
    );

    return response;
  }

  @Auth(true)
  @Get(API_ENDPOINTS.JOBS.GET_JOBS)
  @ApiOkResponse({ type: GetJobsResponseDto })
  public async getJobs(@Query() filter: GetJobsDto) {
    const response = await firstValueFrom(
      this.userServiceClient.send({ cmd: RMQ_MESSAGES.JOBS.GET_JOBS }, filter)
    );

    return response;
  }

  @Auth(true)
  @Patch(API_ENDPOINTS.JOBS.UPDATE_JOB)
  @ApiOkResponse({ type: UpdateJobResponseDto })
  public async updateJob(
    @Req() request: AppRequest,
    @Param() params: IdDto,
    @Body() payload: UpdateJobDto
  ) {
    payload.updatedBy = request?.user?._id;
    payload.id = params.id;

    const response = await firstValueFrom(
      this.userServiceClient.send(
        { cmd: RMQ_MESSAGES.JOBS.UPDATE_JOB },
        payload
      )
    );

    return response;
  }

  @Auth(true)
  @Delete(API_ENDPOINTS.JOBS.DELETE_JOB)
  @ApiOkResponse({ type: DeleteJobsResponseDto })
  public async deleteJob(
    @Req() request: AppRequest,
    @Param() payload: DeleteJobsDto
  ) {
    payload.deletedBy = request?.user?._id;

    const response = await firstValueFrom(
      this.userServiceClient.send(
        { cmd: RMQ_MESSAGES.JOBS.DELETE_JOB },
        payload
      )
    );

    return response;
  }
}
