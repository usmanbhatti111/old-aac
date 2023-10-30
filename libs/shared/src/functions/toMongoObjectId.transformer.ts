import { BadRequestException } from '@nestjs/common';
import { Types, isValidObjectId } from 'mongoose';

// export function toMongoObjectId(payload: any) {
//   for (const key of Object.keys(payload)) {
//     if (key.substring(key.length - 2) == 'Id') {
//       if (Types.ObjectId.isValid(payload[key]))
//         payload[key] = new Types.ObjectId(payload[key]);
//       else throw new BadRequestException(`${key} is not a valid MongoId`);
//     }
//   }
// }

export function toMongoObjectId({ value, key }): Types.ObjectId {
  if (isValidObjectId(value)) {
    return new Types.ObjectId(value);
  } else {
    throw new BadRequestException(`${key} is not a valid MongoId`);
  }
}
