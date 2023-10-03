import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { PrismaService } from '@shared/services';

@Controller()
export class AppController {
  constructor(private prisma: PrismaService) {}

  @MessagePattern('test')
  getData() {
    return this.prisma.testStuff.findMany();
  }
}
