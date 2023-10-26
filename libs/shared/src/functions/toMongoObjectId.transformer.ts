import { BadRequestException } from '@nestjs/common';
import { Types, isValidObjectId } from 'mongoose';

export function toMongoObjectId({ value, key }): Types.ObjectId {
  if (isValidObjectId(value)) {
    return new Types.ObjectId(value);
  } else {
    throw new BadRequestException(`${key} is not a valid MongoId`);
  }
}
