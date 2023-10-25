import { Injectable } from '@nestjs/common';
import { DealsRepository } from '@shared';

@Injectable()
export class LifecycleStagesService {
  constructor(private dealsRepository: DealsRepository) {}
}
