import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';

export class PostResponseDto<T> {
  @Exclude()
  private type: Function;

  constructor(type: Function) {
    this.type = type;
  }

  @Expose()
  @ApiProperty({
    required: true,
    example: '202',
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  statusCode: number;

  @Expose()
  @ApiProperty({
    required: true,
    example: 'Success',
  })
  @IsNotEmpty()
  @IsString()
  message: string = 'Success';

  @Expose()
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @Type((opt) => (opt.newObject as PostResponseDto<T>).type)
  data: T;
}
