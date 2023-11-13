import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddCompanyAccountRoleDto {
  @ApiProperty({ example: '56cb91bdc3464f14678934ca' })
  @IsMongoId()
  @IsNotEmpty()
  organizationId: string;

  @ApiProperty({ example: '56cb91bdc3464f14678934ca' })
  @IsMongoId()
  @IsNotEmpty()
  organizationCompanyAccountId: string;

  @ApiProperty({
    example: 'admin',
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ example: ['add-user', 'view-dashboard', 'add-deals'] })
  permissions: [];
}

// @Prop({
//   type: SchemaTypes.ObjectId,
//   required: true,
//   ref: Organization.name,
// })
// organizationId: string;

// @Prop({
//   type: SchemaTypes.ObjectId,
//   required: true,
//   ref: OrganizationCompanyAccount.name,
// })
// organizationCompanyAccountId: string;

// @Prop({ type: [SchemaTypes.ObjectId], ref: 'permissions', default: [] })
// permissions: string[];
