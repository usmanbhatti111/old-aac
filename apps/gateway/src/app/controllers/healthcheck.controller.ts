import { Controller, Get } from '@nestjs/common';
@Controller('healthcheck')
export class HealthController {
  @Get()
  async get() {
    return { status: 'OK' };
  }
}
