import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsISO8601,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  ECallsSetReminder,
  ECallsStatus,
  ECallsStatusUpdate,
  ECallsType,
  ESendVerifCodeChannel,
  OutcomeEnum,
} from '../../constants/enums';

import { PaginationDto } from '../common';
import { Transform, Type } from 'class-transformer';
import { toMongoObjectId } from '../../functions';

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

export class callLogsDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit: number;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  to?: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  from?: string;
}

export class InitiateCallResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: string;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {
      sid: 'CA119de1266725b825721a88f95c9b5421',
      dateCreated: null,
      dateUpdated: null,
      parentCallSid: null,
      accountSid: 'AC4629ce46f451094dee7dfa054e06d0ec',
      to: '+923335316422',
      toFormatted: '+923335316422',
      from: '+18036102922',
      fromFormatted: '(803) 610-2922',
      phoneNumberSid: 'PN4d725495aa8ad66de459cf27980c01fb',
      status: 'queued',
      startTime: null,
      endTime: null,
      duration: null,
      price: null,
      priceUnit: 'USD',
      direction: 'outbound-api',
      answeredBy: null,
      apiVersion: '2010-04-01',
      forwardedFrom: null,
      groupSid: null,
      callerName: null,
      queueTime: '0',
      trunkSid: null,
      uri: '/2010-04-01/Accounts/AC4629ce46f451094dee7dfa054e06d0ec/Calls/CA119de1266725b825721a88f95c9b5421.json',
      subresourceUris: {
        feedback:
          '/2010-04-01/Accounts/AC4629ce46f451094dee7dfa054e06d0ec/Calls/CA119de1266725b825721a88f95c9b5421/Feedback.json',
        user_defined_messages:
          '/2010-04-01/Accounts/AC4629ce46f451094dee7dfa054e06d0ec/Calls/CA119de1266725b825721a88f95c9b5421/UserDefinedMessages.json',
        notifications:
          '/2010-04-01/Accounts/AC4629ce46f451094dee7dfa054e06d0ec/Calls/CA119de1266725b825721a88f95c9b5421/Notifications.json',
        recordings:
          '/2010-04-01/Accounts/AC4629ce46f451094dee7dfa054e06d0ec/Calls/CA119de1266725b825721a88f95c9b5421/Recordings.json',
        streams:
          '/2010-04-01/Accounts/AC4629ce46f451094dee7dfa054e06d0ec/Calls/CA119de1266725b825721a88f95c9b5421/Streams.json',
        payments:
          '/2010-04-01/Accounts/AC4629ce46f451094dee7dfa054e06d0ec/Calls/CA119de1266725b825721a88f95c9b5421/Payments.json',
        user_defined_message_subscriptions:
          '/2010-04-01/Accounts/AC4629ce46f451094dee7dfa054e06d0ec/Calls/CA119de1266725b825721a88f95c9b5421/UserDefinedMessageSubscriptions.json',
        siprec:
          '/2010-04-01/Accounts/AC4629ce46f451094dee7dfa054e06d0ec/Calls/CA119de1266725b825721a88f95c9b5421/Siprec.json',
        events:
          '/2010-04-01/Accounts/AC4629ce46f451094dee7dfa054e06d0ec/Calls/CA119de1266725b825721a88f95c9b5421/Events.json',
        feedback_summaries:
          '/2010-04-01/Accounts/AC4629ce46f451094dee7dfa054e06d0ec/Calls/FeedbackSummary.json',
      },
    },
  })
  data: object;

  @ApiProperty({ example: null })
  error: string;
}

export class CallCancelCompleteResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: string;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {
      sid: 'CA119de1266725b825721a88f95c9b5421',
      dateCreated: '2023-11-21T06:31:09.000Z',
      dateUpdated: '2023-11-21T06:31:28.000Z',
      parentCallSid: null,
      accountSid: 'AC4629ce46f451094dee7dfa054e06d0ec',
      to: '+923335316422',
      toFormatted: '+923335316422',
      from: '+18036102922',
      fromFormatted: '(803) 610-2922',
      phoneNumberSid: 'PN4d725495aa8ad66de459cf27980c01fb',
      status: 'canceled',
      startTime: '2023-11-21T06:31:09.000Z',
      endTime: '2023-11-21T06:31:28.000Z',
      duration: '0',
      price: null,
      priceUnit: 'USD',
      direction: 'outbound-api',
      answeredBy: null,
      apiVersion: '2010-04-01',
      forwardedFrom: null,
      groupSid: null,
      callerName: '',
      queueTime: '0',
      trunkSid: null,
      uri: '/2010-04-01/Accounts/AC4629ce46f451094dee7dfa054e06d0ec/Calls/CA119de1266725b825721a88f95c9b5421.json',
      subresourceUris: {
        feedback:
          '/2010-04-01/Accounts/AC4629ce46f451094dee7dfa054e06d0ec/Calls/CA119de1266725b825721a88f95c9b5421/Feedback.json',
        user_defined_messages:
          '/2010-04-01/Accounts/AC4629ce46f451094dee7dfa054e06d0ec/Calls/CA119de1266725b825721a88f95c9b5421/UserDefinedMessages.json',
        notifications:
          '/2010-04-01/Accounts/AC4629ce46f451094dee7dfa054e06d0ec/Calls/CA119de1266725b825721a88f95c9b5421/Notifications.json',
        recordings:
          '/2010-04-01/Accounts/AC4629ce46f451094dee7dfa054e06d0ec/Calls/CA119de1266725b825721a88f95c9b5421/Recordings.json',
        streams:
          '/2010-04-01/Accounts/AC4629ce46f451094dee7dfa054e06d0ec/Calls/CA119de1266725b825721a88f95c9b5421/Streams.json',
        payments:
          '/2010-04-01/Accounts/AC4629ce46f451094dee7dfa054e06d0ec/Calls/CA119de1266725b825721a88f95c9b5421/Payments.json',
        user_defined_message_subscriptions:
          '/2010-04-01/Accounts/AC4629ce46f451094dee7dfa054e06d0ec/Calls/CA119de1266725b825721a88f95c9b5421/UserDefinedMessageSubscriptions.json',
        siprec:
          '/2010-04-01/Accounts/AC4629ce46f451094dee7dfa054e06d0ec/Calls/CA119de1266725b825721a88f95c9b5421/Siprec.json',
        events:
          '/2010-04-01/Accounts/AC4629ce46f451094dee7dfa054e06d0ec/Calls/CA119de1266725b825721a88f95c9b5421/Events.json',
        feedback_summaries:
          '/2010-04-01/Accounts/AC4629ce46f451094dee7dfa054e06d0ec/Calls/FeedbackSummary.json',
      },
    },
  })
  data: object;

  @ApiProperty({ example: null })
  error: string;
}

export class GetCalLogsResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: string;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: [
      {
        sid: 'CA119de1266725b825721a88f95c9b5421',
        dateCreated: '2023-11-21T06:31:09.000Z',
        dateUpdated: '2023-11-21T06:31:28.000Z',
        parentCallSid: null,
        accountSid: 'AC4629ce46f451094dee7dfa054e06d0ec',
        to: '+923335316422',
        toFormatted: '+923335316422',
        from: '+18036102922',
        fromFormatted: '(803) 610-2922',
        phoneNumberSid: 'PN4d725495aa8ad66de459cf27980c01fb',
        status: 'canceled',
        startTime: '2023-11-21T06:31:09.000Z',
        endTime: '2023-11-21T06:31:28.000Z',
        duration: '0',
        price: null,
        priceUnit: 'USD',
        direction: 'outbound-api',
        answeredBy: null,
        apiVersion: '2010-04-01',
        forwardedFrom: null,
        groupSid: null,
        callerName: '',
        queueTime: '0',
        trunkSid: '',
        uri: '/2010-04-01/Accounts/AC4629ce46f451094dee7dfa054e06d0ec/Calls/CA119de1266725b825721a88f95c9b5421.json',
        subresourceUris: {
          feedback:
            '/2010-04-01/Accounts/AC4629ce46f451094dee7dfa054e06d0ec/Calls/CA119de1266725b825721a88f95c9b5421/Feedback.json',
          user_defined_messages:
            '/2010-04-01/Accounts/AC4629ce46f451094dee7dfa054e06d0ec/Calls/CA119de1266725b825721a88f95c9b5421/UserDefinedMessages.json',
          notifications:
            '/2010-04-01/Accounts/AC4629ce46f451094dee7dfa054e06d0ec/Calls/CA119de1266725b825721a88f95c9b5421/Notifications.json',
          recordings:
            '/2010-04-01/Accounts/AC4629ce46f451094dee7dfa054e06d0ec/Calls/CA119de1266725b825721a88f95c9b5421/Recordings.json',
          streams:
            '/2010-04-01/Accounts/AC4629ce46f451094dee7dfa054e06d0ec/Calls/CA119de1266725b825721a88f95c9b5421/Streams.json',
          payments:
            '/2010-04-01/Accounts/AC4629ce46f451094dee7dfa054e06d0ec/Calls/CA119de1266725b825721a88f95c9b5421/Payments.json',
          user_defined_message_subscriptions:
            '/2010-04-01/Accounts/AC4629ce46f451094dee7dfa054e06d0ec/Calls/CA119de1266725b825721a88f95c9b5421/UserDefinedMessageSubscriptions.json',
          siprec:
            '/2010-04-01/Accounts/AC4629ce46f451094dee7dfa054e06d0ec/Calls/CA119de1266725b825721a88f95c9b5421/Siprec.json',
          events:
            '/2010-04-01/Accounts/AC4629ce46f451094dee7dfa054e06d0ec/Calls/CA119de1266725b825721a88f95c9b5421/Events.json',
          feedback_summaries:
            '/2010-04-01/Accounts/AC4629ce46f451094dee7dfa054e06d0ec/Calls/FeedbackSummary.json',
        },
      },
    ],
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

export class CreateScheduledCallDTO {
  @ApiProperty({
    type: String,
    required: true,
    example: 'Call with AA Traders',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    required: false,
    enum: ECallsStatus,
    default: ECallsStatus.SCHEDULED,
  })
  @IsEnum(ECallsStatus)
  @IsNotEmpty()
  status: ECallsStatus;

  @ApiProperty({
    type: String,
    required: true,
    example: '2023-11-15',
  })
  @IsISO8601()
  @IsNotEmpty()
  callFromDate: Date;

  @ApiProperty({
    type: String,
    required: false,
    example: '22:00',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  callFromTime?: string;

  @ApiProperty({
    type: String,
    required: true,
    example: '2023-11-15',
  })
  @IsISO8601()
  @IsNotEmpty()
  callToDate: Date;

  @ApiProperty({
    type: String,
    required: false,
    example: '24:00',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  callToTime?: string;

  @ApiProperty({
    type: String,
    required: false,
    example: '6538bb480b3f9e9d83d4a2ce',
  })
  @IsOptional()
  @IsNotEmpty()
  @Transform(toMongoObjectId)
  dealId: string;

  @ApiProperty({
    type: String,
    required: false,
    enum: ECallsType,
    default: ECallsType.ONE_ON_ONE,
  })
  @IsEnum(ECallsType)
  @IsOptional()
  @IsNotEmpty()
  callType?: ECallsType;

  @ApiProperty({
    type: String,
    required: false,
    enum: ECallsSetReminder,
    default: ECallsSetReminder.BEFORE_1_HOUR,
  })
  @IsEnum(ECallsSetReminder)
  @IsOptional()
  @IsNotEmpty()
  setReminder?: ECallsSetReminder;

  @ApiProperty({
    type: Array,
    required: false,
    // example: ['6538bb480b3f9e9d83d4a2ce'],
  })
  @IsArray()
  @IsOptional()
  @Transform(toMongoObjectId)
  // @IsMongoId({ each: true })
  attendees: string[];

  @ApiProperty({
    type: String,
    required: false,
    enum: OutcomeEnum,
    default: OutcomeEnum.INTERESTED,
  })
  @IsEnum(OutcomeEnum)
  @IsOptional()
  @IsNotEmpty()
  outcome?: OutcomeEnum;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  callDetails?: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  callNotes?: string;

  organizationId: string;
  scheduledBy: string;
}

export class CreateScheduledCallResponseDTO {
  @ApiProperty({ example: 200 })
  statusCode: string;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {
      _id: '654e019a7d0f025f1e629b03',
      title: 'Call with AA Traders',
      status: 'Scheduled',
      callFromDate: '2023-11-15T00:00:00.000Z',
      callFromTime: '22:00',
      callToDate: '2023-11-15T00:00:00.000Z',
      callToTime: '24:00',
      dealId: '6538bb480b3f9e9d83d4a2ce',
      callType: 'ONE_ON_ONE',
      setReminder: '1 hour before',
      attendees: [],
      outcome: 'Interested',
      scheduledBy: '6541f00578a1579d65d9bc7e',
      isDeleted: false,
      createdAt: '2023-11-10T10:10:34.241Z',
      updatedAt: '2023-11-10T10:10:34.241Z',
    },
  })
  data: object;

  @ApiProperty({ example: null })
  error: string;
}

export class GetAllScheduledCallDTO extends PaginationDto {
  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  search: string;

  @ApiProperty({
    type: String,
    required: false,
    enum: ECallsStatus,
  })
  @IsEnum(ECallsStatus)
  @IsOptional()
  @IsNotEmpty()
  status: ECallsStatus;

  @ApiProperty({
    required: false,
    description: '2023-11-01',
  })
  @IsISO8601()
  @IsOptional()
  startDate?: string;

  @ApiProperty({
    required: false,
    description: '2023-11-30',
  })
  @IsISO8601()
  @IsOptional()
  endDate?: string;

  @Transform(toMongoObjectId)
  organizationId: string;
}

export class GetAllScheduledCallDTOResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: string;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {
      schedulecalls: [
        {
          _id: '654de042f7ccc0098e1698e0',
          title: 'Call with AA Traders',
          status: 'Scheduled',
          callFromDate: '2023-11-15T00:00:00.000Z',
          callFromTime: '22:00',
          callToDate: '2023-11-15T00:00:00.000Z',
          callToTime: '24:00',
          dealId: '6538bb480b3f9e9d83d4a2ce',
          callType: 'ONE_ON_ONE',
          setReminder: '1 hour before',
          attendees: [],
          outcome: 'Interested',
          scheduledBy: '6541f00578a1579d65d9bc7e',
          createdAt: '2023-11-10T07:48:18.090Z',
          updatedAt: '2023-11-10T07:48:18.090Z',
          isDeleted: false,
          organizationId: '652e0304169f73fd01fd4956',
          users: {
            _id: '6541f00578a1579d65d9bc7e',
            fullName: 'mr khan',
          },
        },
      ],
      meta: {
        page: 0,
        pages: 1,
        limit: 10,
        total: 1,
      },
    },
  })
  data: object;

  @ApiProperty({ example: null })
  error: string;
}

export class scheduleCallId {
  @ApiProperty({
    type: String,
    required: true,
    example: '654dddfd42abc07e1a8fcad7',
  })
  @Transform(toMongoObjectId)
  id: string;
}

export class UpdateScheduledCallDTO {
  @ApiProperty({
    type: String,
    required: false,
    example: 'Call with AA Traders',
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    required: false,
    enum: ECallsStatus,
    default: ECallsStatus.SCHEDULED,
  })
  @IsEnum(ECallsStatus)
  @IsOptional()
  @IsNotEmpty()
  status: ECallsStatus;

  @ApiProperty({
    type: String,
    required: false,
    example: '2023-11-15',
  })
  @IsISO8601()
  @IsOptional()
  @IsNotEmpty()
  callFromDate: Date;

  @ApiProperty({
    type: String,
    required: false,
    example: '22:00',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  callFromTime?: string;

  @ApiProperty({
    type: String,
    required: false,
    example: '2023-11-15',
  })
  @IsISO8601()
  @IsNotEmpty()
  @IsOptional()
  callToDate: Date;

  @ApiProperty({
    type: String,
    required: false,
    example: '24:00',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  callToTime?: string;

  @ApiProperty({
    type: String,
    required: false,
    example: '6538bb480b3f9e9d83d4a2ce',
  })
  @IsOptional()
  @IsNotEmpty()
  @Transform(toMongoObjectId)
  dealId: string;

  @ApiProperty({
    type: String,
    required: false,
    enum: ECallsType,
    default: ECallsType.ONE_ON_ONE,
  })
  @IsEnum(ECallsType)
  @IsOptional()
  @IsNotEmpty()
  callType?: ECallsType;

  @ApiProperty({
    type: String,
    required: false,
    enum: ECallsSetReminder,
    default: ECallsSetReminder.BEFORE_1_HOUR,
  })
  @IsEnum(ECallsSetReminder)
  @IsOptional()
  @IsNotEmpty()
  setReminder?: ECallsSetReminder;

  // @ApiProperty({
  //   type: Array,
  //   required: false,
  //   // example: ['6538bb480b3f9e9d83d4a2ce'],
  // })
  // @IsArray()
  // @IsOptional()
  // @Transform(toMongoObjectId)
  // // @IsMongoId({ each: true })
  // attendees: string[];

  @ApiProperty({
    type: String,
    required: false,
    enum: OutcomeEnum,
    default: OutcomeEnum.INTERESTED,
  })
  @IsEnum(OutcomeEnum)
  @IsOptional()
  @IsNotEmpty()
  outcome?: OutcomeEnum;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  callDetails?: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  callNotes?: string;

  userId: string;
  organizationId: string;
  id?: string;
}

export class addAttendeesDto {
  @ApiProperty({
    type: Array,
    required: false,
    example: ['6538bb480b3f9e9d83d4a2ce'],
  })
  @IsArray()
  @IsOptional()
  // @Transform(toMongoObjectId)
  @IsMongoId({ each: true })
  attendees: string[];

  id?: string;
  organizationId?: string;
  createdBy?: string;
}

export class addAttendeesResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: string;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {
      data: {
        _id: '654e019a7d0f025f1e629b03',
        title: 'Call with AA Traders',
        status: 'Scheduled',
        callFromDate: '2023-11-15T00:00:00.000Z',
        callFromTime: '22:00',
        callToDate: '2023-11-15T00:00:00.000Z',
        callToTime: '24:00',
        dealId: '6538bb480b3f9e9d83d4a2ce',
        callType: 'ONE_ON_ONE',
        setReminder: '1 hour before',
        attendees: ['6538bb480b3f9e9d83d4a2ce', '6538bb480b3f9e9d83d4a2c1'],
        outcome: 'Interested',
        scheduledBy: '6541f00578a1579d65d9bc7e',
        isDeleted: false,
        createdAt: '2023-11-10T10:10:34.241Z',
        updatedAt: '2023-11-16T05:56:33.549Z',
        callDetails: 'string',
        callNotes: 'string',
        organizationId: '652e0304169f73fd01fd4956',
      },
    },
  })
  data: object;

  @ApiProperty({ example: null })
  error: string;
}

export class attendeesIdDto {
  @ApiProperty({
    type: String,
    required: true,
    example: '654dddfd42abc07e1a8fcad7',
  })
  @Transform(toMongoObjectId)
  attendeesId: string;
}

export class UpdateCallStatusDto {
  @ApiProperty({
    type: String,
    required: true,
    example: 'CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  })
  @IsString()
  @IsNotEmpty()
  callSid: string;

  @ApiProperty({
    type: String,
    required: true,
    enum: ECallsStatusUpdate,
    description: 'canceled before call attend | completed after call accept',
  })
  @IsEnum(ECallsStatusUpdate)
  @IsNotEmpty()
  status: ECallsStatusUpdate;
}
