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
  if (!value) return;
  if (Array.isArray(value)) {
    for (const val of value) {
      if (isValidObjectId(val)) {
        return new Types.ObjectId(val);
      } else {
        throw new BadRequestException(
          `${val} of ${key} is not a valid MongoId`
        );
      }
    }
  }
  if (isValidObjectId(value)) {
    return new Types.ObjectId(value);
  } else {
    throw new BadRequestException(`${key} is not a valid MongoId`);
  }
}
