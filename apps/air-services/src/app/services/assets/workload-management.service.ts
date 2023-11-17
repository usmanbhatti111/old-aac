import { HttpStatus, Injectable } from '@nestjs/common';
import { ResponseMessage, successResponse } from '@shared/constants';
import { TaskRepository, TicketRepository } from '@shared';
import { RpcException } from '@nestjs/microservices';
import dayjs from 'dayjs';
import { WorkLoadFilterDto } from '@shared/dto';

@Injectable()
export class WorkloadManagementService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private ticketRepository: TicketRepository
  ) {}

  async getWorkload(query: WorkLoadFilterDto) {
    try {
      const {
        startDate,
        countDayWise,
        countDayWiseHours,
        manage,
        countDayWiseHoursAverage,
      } = query;
      const startOfCustomRange = startDate
        ? dayjs(startDate).startOf('day')
        : null;
      const endOfCustomRange = startDate
        ? startOfCustomRange.add(1, 'week').endOf('day')
        : null;
      const pipeline: any[] = [];

      const matchConditions = [];

      if (manage && manage.toUpperCase() !== 'ALL') {
        if (startDate) {
          matchConditions.push({
            $or: [
              {
                startDate: {
                  $gte: startOfCustomRange.toDate(),
                  $lte: endOfCustomRange.toDate(),
                },
              },
              {
                endDate: {
                  $gte: startOfCustomRange.toDate(),
                  $lte: endOfCustomRange.toDate(),
                },
              },
            ],
          });
        }

        if (
          manage === 'in-progress' ||
          manage === 'DELAYED' ||
          manage === 'open'
        ) {
          matchConditions.push({
            $or: [
              { status: 'in-progress', endDate: { $lte: new Date() } },
              { status: 'open', endDate: { $lte: new Date() } },
              { status: 'DELAYED', endDate: { $lte: new Date() } },
            ],
          });
        } else if (manage === 'PLANNED') {
          matchConditions.push({ startDate: { $exists: true, $ne: null } });
          matchConditions.push({ endDate: { $exists: true, $ne: null } });
        } else if (manage === 'UNPLANNED') {
          matchConditions.push({
            $or: [
              { startDate: { $exists: false } },
              { endDate: { $exists: false } },
            ],
          });
        } else {
          matchConditions.push({ status: manage });
        }

        if (matchConditions.length > 0) {
          pipeline.push({
            $match: { $and: matchConditions },
          });
        }
      }

      if (startDate) {
        pipeline.push({
          $match: {
            $or: [
              {
                startDate: {
                  $gte: startOfCustomRange.toDate(),
                  $lte: endOfCustomRange.toDate(),
                },
              },
              {
                endDate: {
                  $gte: startOfCustomRange.toDate(),
                  $lte: endOfCustomRange.toDate(),
                },
              },
            ],
          },
        });
      }

      if (countDayWise) {
        pipeline.push({
          $addFields: {
            dateRange: {
              $setDifference: [
                {
                  $map: {
                    input: {
                      $range: [
                        0,
                        {
                          $add: [
                            1,
                            {
                              $cond: {
                                if: { $ifNull: ['$endDate', false] },
                                then: {
                                  $divide: [
                                    { $subtract: ['$endDate', '$startDate'] },
                                    1000 * 60 * 60 * 24,
                                  ],
                                },
                                else: 0,
                              },
                            },
                          ],
                        },
                      ],
                    },
                    as: 'dayOffset',
                    in: {
                      $add: [
                        '$startDate',
                        { $multiply: ['$$dayOffset', 1000 * 60 * 60 * 24] },
                      ],
                    },
                  },
                },
                [null],
              ],
            },
          },
        });

        pipeline.push({
          $unwind: '$dateRange',
        });

        pipeline.push({
          $project: {
            year: { $year: '$dateRange' },
            month: { $month: '$dateRange' },
            day: { $dayOfMonth: '$dateRange' },
            task: '$$ROOT',
          },
        });

        pipeline.push({
          $group: {
            _id: {
              year: '$year',
              month: '$month',
              day: '$day',
            },
            tasks: { $push: '$task' },
            count: { $sum: 1 },
          },
        });

        pipeline.push({
          $project: {
            _id: 0,
            year: '$_id.year',
            month: '$_id.month',
            day: '$_id.day',
            count: 1,
            tasks: 1,
          },
        });
      }

      if (countDayWiseHours) {
        pipeline.push({
          $addFields: {
            plannedEffortHours: {
              $toInt: {
                $arrayElemAt: [{ $split: ['$plannedEffort', 'h'] }, 0],
              },
            },
            plannedEffortMinutes: {
              $toInt: {
                $arrayElemAt: [
                  {
                    $split: [
                      {
                        $arrayElemAt: [{ $split: ['$plannedEffort', 'h'] }, 1],
                      },
                      'm',
                    ],
                  },
                  0,
                ],
              },
            },
          },
        });

        pipeline.push({
          $addFields: {
            plannedEffortTotalMinutes: {
              $add: [
                { $multiply: ['$plannedEffortHours', 60] },
                '$plannedEffortMinutes',
              ],
            },
          },
        });

        pipeline.push({
          $addFields: {
            dateRange: {
              $map: {
                input: {
                  $range: [
                    0,
                    {
                      $add: [
                        1,
                        {
                          $cond: {
                            if: { $ifNull: ['$endDate', false] },
                            then: {
                              $divide: [
                                { $subtract: ['$endDate', '$startDate'] },
                                1000 * 60 * 60 * 24,
                              ],
                            },
                            else: 0,
                          },
                        },
                      ],
                    },
                  ],
                },
                as: 'dayOffset',
                in: {
                  $add: [
                    '$startDate',
                    { $multiply: ['$$dayOffset', 1000 * 60 * 60 * 24] },
                  ],
                },
              },
            },
          },
        });

        pipeline.push({
          $unwind: '$dateRange',
        });

        pipeline.push({
          $group: {
            _id: {
              date: {
                $dateToString: { format: '%Y-%m-%d', date: '$dateRange' },
              },
            },
            totalPlannedEffort: { $sum: '$plannedEffortTotalMinutes' },
            count: { $sum: 1 },
          },
        });

        pipeline.push({
          $addFields: {
            totalPlannedEffortFormatted: {
              $concat: [
                {
                  $toString: {
                    $trunc: { $divide: ['$totalPlannedEffort', 60] },
                  },
                },
                'h ',
                { $toString: { $mod: ['$totalPlannedEffort', 60] } },
                'm',
              ],
            },
          },
        });

        pipeline.push({
          $project: {
            _id: 0,
            date: '$_id.date',
            totalPlannedEffortFormatted: 1,
          },
        });
      }
      if (countDayWiseHoursAverage) {
        pipeline.push({
          $addFields: {
            plannedEffortHours: {
              $toInt: {
                $arrayElemAt: [{ $split: ['$plannedEffort', 'h'] }, 0],
              },
            },
            plannedEffortMinutes: {
              $toInt: {
                $arrayElemAt: [
                  {
                    $split: [
                      {
                        $arrayElemAt: [{ $split: ['$plannedEffort', 'h'] }, 1],
                      },
                      'm',
                    ],
                  },
                  0,
                ],
              },
            },
          },
        });

        pipeline.push({
          $addFields: {
            plannedEffortTotalMinutes: {
              $add: [
                { $multiply: ['$plannedEffortHours', 60] },
                '$plannedEffortMinutes',
              ],
            },
          },
        });

        pipeline.push({
          $addFields: {
            dateRange: {
              $map: {
                input: {
                  $range: [
                    0,
                    {
                      $add: [
                        1,
                        {
                          $divide: [
                            { $subtract: ['$endDate', '$startDate'] },
                            1000 * 60 * 60 * 24,
                          ],
                        },
                      ],
                    },
                  ],
                },
                as: 'dayOffset',
                in: {
                  $add: [
                    '$startDate',
                    { $multiply: ['$$dayOffset', 1000 * 60 * 60 * 24] },
                  ],
                },
              },
            },
          },
        });

        pipeline.push({
          $unwind: '$dateRange',
        });

        pipeline.push({
          $group: {
            _id: {
              date: {
                $dateToString: { format: '%Y-%m-%d', date: '$dateRange' },
              },
            },
            totalPlannedEffort: { $sum: '$plannedEffortTotalMinutes' },
            count: { $sum: 1 },
          },
        });

        pipeline.push({
          $addFields: {
            averagePlannedEffort: {
              $divide: ['$totalPlannedEffort', '$count'],
            },
          },
        });

        pipeline.push({
          $project: {
            _id: 0,
            date: '$_id.date',
            averagePlannedEffort: 1,
          },
        });
      }

      const res = await this.taskRepository.aggregate(pipeline);

      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, res);
    } catch (error) {
      return new RpcException(error);
    }
  }

  async getUsersTasks(userIds) {
    try {
      const filterQuery =
        userIds && userIds.length > 0 ? { assignTo: { $in: userIds } } : {};
      const res = await this.taskRepository.find(filterQuery);
      return successResponse(
        HttpStatus.CREATED,
        'Data Fetched Successfully',
        res
      );
    } catch (error) {
      return new RpcException(error);
    }
  }
}
