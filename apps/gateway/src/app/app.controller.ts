import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SERVICES } from '@shared/constants';
import { firstValueFrom } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    @Inject(SERVICES.SUPER_ADMIN)
    private readonly serviceClient: ClientProxy
  ) {}

  @Get()
  async getData() {
    const res = await firstValueFrom(this.serviceClient.send('test', {}));
    return {
      message: 'Succces',
      msg: res,
    };
  }
}
