import { ApiProperty } from '@nestjs/swagger';

export interface IVerification {
  first_name: string;
  last_name: string;
  email: string;
  unique_identifier: string | any;
}

export interface IUpdateStatus {
  user_id: string;
  email: string;
  status: string;
}

export enum VerificationStatus {
  Not_Started = 'Not Started',
  Started = 'Started',
  Submitted = 'Submitted',
  Expired = 'Expired',
  Abandoned = 'Abandoned',
  Declined = 'Declined',
  Approved = 'Approved',
  Under_Review = 'Under Review',
}

export enum VerificationDocument {
  Passport = 'Passport',
  License = 'License',
  Address_Permit = 'Address Permit',
  Proof_Address = 'Proof Address',
}

export class WebhookRequestDto {
  id: string;
  integrationId: string;
  status: VerificationStatus;
  uniqueIdentifier: string;
  documentType?: VerificationDocument | null;
  requestUrl: string;
  hasError?: boolean;
  phoneNumberVerified: boolean;
  verifiedPhoneNumber: string;
  documentBack: { url: string };
  documentFront: { url: string };
  verificationDetails: {
    firstName: string;
    lastName: string;
    dateOfBirth: string | null;
    gender: string | null;
    idNumber: string | null;
    nationality: string | null;
    placeOfBirth: string | null;
    name: string | null;
    surname: string | null;
    expiration_date: string | null;
    address: string | null;
    country: string | null;
  };
  reason: string | null;
}

export class InitiateVerificationRequestDto {
  @ApiProperty({
    example: 'alex.jones@yopmail.com',
    required: true,
  })
  email: string;
}

export class InitiateVerificationResponseDto {
  @ApiProperty({
    example: 201,
  })
  statusCode: number;

  @ApiProperty({
    example: 'Session Initiated Successfully!',
  })
  message: string;

  @ApiProperty({
    example: null,
  })
  data: string;

  @ApiProperty({
    example: null,
  })
  error: string;
}

export class UpdateVerificationStatusQueryDto {
  @ApiProperty()
  user_id: string;

  @ApiProperty()
  email: string;

  @ApiProperty({
    enum: VerificationStatus,
  })
  status: string;
}

export class UpdateVerificationStatusResponseDto {
  @ApiProperty({
    example: 200,
  })
  statusCode: number;

  @ApiProperty({
    example: 'User Status Updated Successfully!',
  })
  message: string;

  @ApiProperty({
    example: null,
  })
  data: string;

  @ApiProperty({
    example: null,
  })
  error: string;
}
