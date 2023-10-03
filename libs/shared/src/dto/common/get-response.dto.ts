import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from './pagination.dto';
import { Exclude, Expose, Type } from 'class-transformer';

export class PaginationResponseDto extends PaginationDto {
  @ApiProperty({
    required: true,
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  count: number;
}

export class GetResponseDto<T> {
  @Exclude()
  private type: Function;

  constructor(type: Function) {
    this.type = type;
  }

  @Expose()
  @ApiProperty({
    required: true,
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  statusCode: number;

  @Expose()
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  message: string = 'Success';

  @Expose()
  @ApiProperty({
    required: true,
    isArray: true,
  })
  @IsNotEmpty()
  @Type((opt) => (opt.newObject as GetResponseDto<T>).type)
  data: T[];

  @Expose()
  @ApiProperty({
    required: false,
    type: () => PaginationResponseDto,
  })
  @IsOptional()
  @Type(() => PaginationResponseDto)
  pagination: PaginationResponseDto;
}
