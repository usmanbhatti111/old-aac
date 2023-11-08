import { ApiProperty } from '@nestjs/swagger';
import { AttachmentDTO, OrganizationDto, SalesProductDto } from '@shared/dto';
import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { toMongoObjectId } from 'libs/shared/src/functions';

export class DealTaskDto {
  @ApiProperty({
    type: String,
    required: false,
    example: '6538bb480b3f9e9d83d4a2ce',
  })
  @IsNotEmpty()
  @IsOptional()
  @Transform(toMongoObjectId)
  dealId: string;

  @ApiProperty({
    type: String,
    required: false,
    example: '6538bb480b3f9e9d83d4a2ce',
  })
  @IsNotEmpty()
  @IsOptional()
  @Transform(toMongoObjectId)
  taskId: string;
}

export class DealTasksResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Products Fetched Successfully' })
  message: string;

  @ApiProperty({
    example: [
      {
        _id: '6527c1ba7f7151d4953910b2',
        ticketId: '651bdf53beeb02bc627d6804',
        title: 'Title Name',
        description: 'Content will display here...',
        workSpace: 'Content will display here...',
        assignTo: 'User',
        status: 'Status',
        notifyBefore: '15 Minutes',
        startDate: '2023-10-12T09:51:52.910Z',
        endDate: '2023-10-12T09:51:52.911Z',
        plannedEffort: '1h10m',
        createdAt: '2023-10-12T09:51:54.958Z',
        updatedAt: '2023-10-12T09:51:54.958Z',
      },
    ],
  })
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}
