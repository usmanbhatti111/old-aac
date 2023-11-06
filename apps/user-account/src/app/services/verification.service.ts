import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  InitiateVerificationRequestDto,
  IVerification,
  VerificationStatus,
  WebhookRequestDto,
} from '@shared/dto';
import crypto from 'crypto';
import { DeclineEmail } from '../templates/verification-decline';
import { ApproveEmail } from '../templates/verification-approve';
import { EmailService } from '@shared/services';
import { UserRepository } from '@shared';
import { Types } from 'mongoose';
import { successResponse, UserAccountStatus } from '@shared/constants';
import { RpcException } from '@nestjs/microservices';
import { AuthService } from './auth.service';
@Injectable()
export class VerificationService {
  constructor(
    private userReposity: UserRepository,
    private emailService: EmailService,
    private authService: AuthService,
    private configService: ConfigService,
    private readonly httpService: HttpService
  ) {}

  statusEmailMap = {
    Approved: "Verification Approved - You're Ready to Log In!",
    Declined: 'Verification Process Declined',
  };

  async sendStatusEmail(
    name: string,
    email: string,
    status: VerificationStatus
  ): Promise<boolean> {
    const params = {
      recipients: [email],
      subject: this.statusEmailMap[status],
      html:
        status === VerificationStatus.Approved
          ? ApproveEmail(name)
          : DeclineEmail(name),
    };

    try {
      return await this.emailService.sendMail(params);
    } catch (error) {
      return error;
    }
  }

  async initiateVerification(
    payload: IVerification | InitiateVerificationRequestDto
  ) {
    try {
      const { email } = payload;

      const user = await this.userReposity.findOne({
        email,
      });

      payload = {
        email,
        first_name: user.firstName,
        last_name: user.lastName,
        unique_identifier: user._id,
      };

      const userInfo = JSON.stringify(payload);
      const verificationPayload = {
        data: this.encryptUserData(userInfo),
        publicKey: this.configService.get<string>('IG_PUBLIC'),
      };

      const apiUrl = `${this.configService.get<string>(
        'IG_BASE_URL'
      )}/verification/verification`;

      const verification: any = await this.httpService.axiosRef.post(
        apiUrl,
        verificationPayload
      );

      return successResponse(201, 'Session Initiated Successfully!', {
        verificationLink: `${this.configService.get<string>(
          'IG_APP_URL'
        )}/app/verifications/verification-session?keyword=${
          verification.data.data.linkCode
        }`,
      });
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async updateIgStatus(payload: WebhookRequestDto): Promise<any> {
    try {
      const { id, verifiedPhoneNumber, uniqueIdentifier, status } = payload;

      const verify = await this.verifyExistingUser(uniqueIdentifier);
      if (!verify) {
        throw new BadRequestException('User does not exist!');
      }

      if (status === VerificationStatus.Submitted) {
        await this.authService.adminConfirmPassword(uniqueIdentifier);
      }

      const updatePayload = {
        veriffStatus: status,
        ...([
          VerificationStatus.Submitted,
          VerificationStatus.Approved,
        ].includes(status) && {
          status: UserAccountStatus.ACTIVE,
          isBlocked: false,
          verificationId: id,
          verifiedPhoneNumber,
        }),
      };

      const serviceRes = await this.updateVerificationStatus(
        uniqueIdentifier,
        updatePayload
      );

      if (
        [VerificationStatus.Approved, VerificationStatus.Declined].includes(
          status
        )
      ) {
        await this.sendStatusEmail(
          payload.verificationDetails.name,
          serviceRes[1].email,
          status
        );
      }

      return successResponse(200, 'User Status Updated Successfully!', {});
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async updateVerificationStatus(id: string, payload: any) {
    return this.userReposity.findByIdAndUpdate({ _id: id }, { $set: payload });
  }

  async verifyExistingUser(id: string) {
    return this.userReposity.findOne({
      _id: new Types.ObjectId(id),
    });
  }

  private encryptUserData(data: string) {
    const algorithm = 'aes-256-gcm';
    const publicKey = this.configService
      .get<string>('IG_PUBLIC')
      .substring(0, 24);
    const privateKey = Buffer.from(
      this.configService.get<string>('IG_PRIVATE'),
      'hex'
    );
    const cipher = crypto.createCipheriv(algorithm, privateKey, publicKey);
    let enc = cipher.update(data, 'utf8', 'hex');
    enc += cipher.final('hex');
    return enc;
  }
}
