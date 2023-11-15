import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class ColumnPipe implements PipeTransform {
  transform(value: any) {
    if (value === '*') {
      return value;
    }
    if (!Array.isArray(value)) {
      value = [value];
    }
    return value.reduce((acc, item) => {
      acc[item] = 1;
      return acc;
    }, {});
  }
}
