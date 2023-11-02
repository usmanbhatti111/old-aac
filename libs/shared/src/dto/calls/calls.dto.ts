import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { ESendVerifCodeChannel } from '../../constants/enums';

export class GetNumbersListDto {
  @ApiProperty({
    type: String,
    required: true,
    example: 'Bristol',
  })
  @IsString()
  @IsNotEmpty()
  locality: string;

  organizationPlanId: string;
  createdBy?: string;
}

export class GetNumbersListResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: string;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: [
      {
        friendlyName: '+441174633038',
        phoneNumber: '+441174633038',
        lata: null,
        locality: 'Bristol',
        rateCenter: null,
        latitude: '51.455230',
        longitude: '-2.596650',
        region: 'England',
        postalCode: null,
        isoCountry: 'GB',
        addressRequirements: 'any',
        beta: false,
        capabilities: {
          voice: true,
          SMS: false,
          MMS: false,
        },
      },
    ],
  })
  data: object;

  @ApiProperty({ example: null })
  error: string;
}

export class InitiateCallDto {
  @ApiProperty({
    type: String,
    required: true,
    example: '+18036102922',
  })
  @IsString()
  @IsNotEmpty()
  callTo: string;

  @ApiProperty({
    type: String,
    required: true,
    example: '+18036102922',
  })
  @IsString()
  @IsNotEmpty()
  callFrom: string;

  callBy?: string;
}
export class InitiateCallResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: string;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {},
  })
  data: object;

  @ApiProperty({ example: null })
  error: string;
}

export class VerifyPhoneNumberDto {
  @ApiProperty({
    type: String,
    required: true,
    example: '+18036102922',
  })
  @IsString()
  @IsNotEmpty()
  verifyPhoneNumber: string;

  verifyBy?: string;
}
export class VerifyPhoneNumberResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: string;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {
      name: 'v2',
      url: 'https://verify.twilio.com/v2',
    },
  })
  data: object;

  @ApiProperty({ example: null })
  error: string;
}

export class AddNewOutgoingCallerDto {
  @ApiProperty({
    type: String,
    required: true,
    example: 'New Home Number',
  })
  @IsString()
  @IsNotEmpty()
  friendlyName: string;

  @ApiProperty({
    type: String,
    required: true,
    example: '+18036102922',
  })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  createdBy?: string;
}
export class AddNewOutgoingCallerResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: string;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {},
  })
  data: object;

  @ApiProperty({ example: null })
  error: string;
}

export class sendVerificationTokenDto {
  @ApiProperty({
    type: String,
    required: true,
    example: '+18036102922',
  })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    type: String,
    required: true,
    enum: ESendVerifCodeChannel,
    example: ESendVerifCodeChannel.SMS,
  })
  @IsEnum(ESendVerifCodeChannel)
  @IsNotEmpty()
  channel: string;

  createdBy?: string;
}
export class sendVerificationTokenResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: string;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {},
  })
  data: object;

  @ApiProperty({ example: null })
  error: string;
}

export class verifyNumberToken {
  @ApiProperty({
    type: String,
    required: true,
    example: '+18036102922',
  })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    type: String,
    required: true,
    example: '012360',
  })
  @IsString()
  @IsNotEmpty()
  code: string;

  createdBy?: string;
}

export class verifyNumberTokenResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: string;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {},
  })
  data: object;

  @ApiProperty({ example: null })
  error: string;
}
