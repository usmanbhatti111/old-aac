import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class ColumnPipe implements PipeTransform {
  transform(value: any) {
    return value.reduce((acc, item) => {
      acc[item] = 1;
      return acc;
    }, {});
  }
}
