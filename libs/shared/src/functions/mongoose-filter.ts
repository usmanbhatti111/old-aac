import dayjs from 'dayjs';
import { EMongooseDateFilter } from '../constants';

export const mongooseDateFilter = (filter: string, key: string) => {
  const today = dayjs();
  switch (filter) {
    case EMongooseDateFilter.ALL_TIME:
      return {};
    case EMongooseDateFilter.TODAY:
      return {
        [key]: {
          $lte: today.endOf('day').toDate(),
          $gte: today.startOf('day').toDate(),
        },
      };
    case EMongooseDateFilter.YESTERDAY:
      return {
        [key]: {
          $lte: today.startOf('day').subtract(1, 'day').endOf('day').toDate(),
          $gte: today.startOf('day').subtract(1, 'day').startOf('day').toDate(),
        },
      };
    case EMongooseDateFilter.PREVIOUS_WEEK:
      return {
        [key]: {
          $lte: today.startOf('day').subtract(1, 'week').endOf('week').toDate(),
          $gte: today
            .startOf('day')
            .subtract(1, 'week')
            .startOf('week')
            .toDate(),
        },
      };
    case EMongooseDateFilter.PREVIOUS_MONTH:
      return {
        [key]: {
          $lte: today
            .startOf('month')
            .subtract(1, 'month')
            .endOf('month')
            .toDate(),
          $gte: today
            .startOf('month')
            .subtract(1, 'month')
            .startOf('month')
            .toDate(),
        },
      };
    case EMongooseDateFilter.NEXT_WEEK:
      return {
        [key]: {
          $lte: today.endOf('week').add(1, 'week').endOf('week').toDate(),
          $gte: today.endOf('week').add(1, 'week').startOf('week').toDate(),
        },
      };
    case EMongooseDateFilter.NEXT_MONTH:
      return {
        [key]: {
          $lte: today.endOf('month').add(1, 'month').endOf('month').toDate(),
          $gte: today.endOf('month').add(1, 'month').startOf('month').toDate(),
        },
      };
    case EMongooseDateFilter.NONE:
      return {
        [key]: {
          $exists: false,
        },
      };
    default:
      return {};
  }
};
