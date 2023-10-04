import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ExampleService } from '../services/examples.service';
import { RMQ_MESSAGES } from '@shared/constants';
import { CreateExampleDto, GetExamplesDto } from '@shared/dto';

@Controller()
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @MessagePattern({ cmd: RMQ_MESSAGES.EXAMPLE.CREATE_EXAMPLE })
  createExample(@Payload() payload: CreateExampleDto) {
    return this.exampleService.create(payload);
  }

  @MessagePattern({ cmd: RMQ_MESSAGES.EXAMPLE.GET_EXAMPLES })
  getExamples(@Payload() payload: GetExamplesDto) {
    return this.exampleService.list(payload);
  }

  @MessagePattern({ cmd: RMQ_MESSAGES.EXAMPLE.EDIT_EXAMPLE })
  editExample(@Payload() payload: any) {
    return this.exampleService.update(payload);
  }
}
