import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import {
  API_TAGS,
  CONTROLLERS,
  RMQ_MESSAGES,
  SERVICES,
} from '@shared/constants';
import { CreateContactDto, CreateContactResponseDto } from '@shared/dto';
import { Response } from 'express';
import { firstValueFrom } from 'rxjs';

@ApiTags(API_TAGS.CONTACT)
@Controller(CONTROLLERS.CONTACT)
@ApiBearerAuth()
export class ContactController {
  constructor(
    @Inject(SERVICES.COMMON_FEATURE) private commonFeatureClient: ClientProxy
  ) {}

  @Post()
  @ApiCreatedResponse({ type: CreateContactResponseDto })
  public async createJob(
    @Body() payload: CreateContactDto,
    @Res() res: Response | any
  ) {
    const response = await firstValueFrom(
      this.commonFeatureClient.send(
        { cmd: RMQ_MESSAGES.CONTACT.CREATE_CONTACT },
        payload
      )
    );
    res.status(response.statusCode).json(response);
  }
}
