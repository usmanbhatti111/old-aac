import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
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
  FilterJobsDto,
  GetJobResponseDto,
  GetJobsResponseDto,
  UpdateJobDto,
} from '@shared/dto';
import { Response } from 'express';
import { firstValueFrom } from 'rxjs';

@ApiTags(API_TAGS.SETTINGS)
@Controller(CONTROLLERS.SETTINGS.JOBS)
@ApiBearerAuth()
export class JobsController {
  constructor(
    @Inject(SERVICES.SUPER_ADMIN) private userServiceClient: ClientProxy
  ) {}

  @Post()
  @ApiCreatedResponse({ type: CreateJobResponseDto })
  public async createJob(
    @Body() payload: CreateJobDto,
    @Res() res: Response | any
  ) {
    try {
      const response = await firstValueFrom(
        this.userServiceClient.send(
          { cmd: RMQ_MESSAGES.JOBS.CREATE_JOB },
          payload
        )
      );
      res.status(response.statusCode).json(response);
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
  }

  @Get(API_ENDPOINTS.JOBS.GET_JOB)
  @ApiCreatedResponse({ type: GetJobResponseDto })
  public async getJob(@Param('id') id: string, @Res() res: Response | any) {
    try {
      const response = await firstValueFrom(
        this.userServiceClient.send({ cmd: RMQ_MESSAGES.JOBS.GET_JOB }, { id })
      );
      res.status(response.statusCode).json(response);
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
  }

  @Get()
  @ApiCreatedResponse({ type: GetJobsResponseDto })
  public async getJobs(
    @Query() filter: FilterJobsDto,
    @Res() res: Response | any
  ) {
    try {
      const response = await firstValueFrom(
        this.userServiceClient.send({ cmd: RMQ_MESSAGES.JOBS.GET_JOBS }, filter)
      );
      res.status(response.statusCode).json(response);
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
  }

  @Patch(API_ENDPOINTS.JOBS.UPDATE_JOB)
  @ApiCreatedResponse({ type: GetJobResponseDto })
  public async updateJob(
    @Body() payload: UpdateJobDto,
    @Res() res: Response | any
  ) {
    try {
      const response = await firstValueFrom(
        this.userServiceClient.send(
          { cmd: RMQ_MESSAGES.JOBS.UPDATE_JOB },
          payload
        )
      );

      res.status(response.statusCode).json(response);
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
  }

  @Delete(API_ENDPOINTS.JOBS.DELETE_JOB)
  @ApiCreatedResponse({ type: GetJobResponseDto })
  public async deleteJob(
    @Query('id') id: string[],
    @Res() res: Response | any
  ) {
    try {
      if (typeof id === 'string') id = [id];

      const response = await firstValueFrom(
        this.userServiceClient.send(
          { cmd: RMQ_MESSAGES.JOBS.DELETE_JOB },
          { id }
        )
      );
      res.status(response.statusCode).json(response);
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
  }
}
