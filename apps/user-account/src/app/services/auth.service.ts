import {
  BadRequestException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';
import { UserRepository } from '@shared';
import {
  ResponseMessage,
  successResponse,
  UserStatus,
} from '@shared/constants';
import { SignInDto, SignupDto, VerificationStatus } from '@shared/dto';
import { CognitoJwtVerifier } from 'aws-jwt-verify';
import AWS, { CognitoIdentityServiceProvider } from 'aws-sdk';
import {
  AdminUpdateUserAttributesRequest,
  InitiateAuthRequest,
  SignUpRequest,
} from 'aws-sdk/clients/cognitoidentityserviceprovider';
import { createHmac } from 'crypto';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthService {
  public userPoolId = this.configService.get<string>('COGNITO_USERPOOL_ID');
  public clientId = this.configService.get<string>('COGNITO_CLIENT_ID');
  public region = this.configService.get<string>('COGNITO_REGION');
  private cognito: CognitoIdentityServiceProvider;

  constructor(
    private configService: ConfigService,
    private userService: UserService,
    private userRepository: UserRepository
  ) {
    AWS.config.update({
      accessKeyId: this.configService.get<string>('COGNITO_ACCESS_KEY'),
      secretAccessKey: this.configService.get<string>('COGNITO_SECRET_KEY'),
      region: this.region,
    });
    this.cognito = new CognitoIdentityServiceProvider({
      region: this.region,
    });
  }

  private createSecretHash(email: string): string {
    const hmac = createHmac(
      'sha256',
      this.configService.get<string>('COGNITO_CLIENT_SECRET')
    );
    hmac.update(email);
    hmac.update(this.clientId);
    return hmac.digest('base64');
  }

  public async signup(user: SignupDto) {
    const { email, password, firstName, lastName, role } = user;

    const params: SignUpRequest = {
      ClientId: this.clientId,
      Username: email,
      Password: password,
      SecretHash: this.createSecretHash(email),
      UserAttributes: [
        { Name: 'email', Value: email },
        { Name: 'name', Value: `${firstName} ${lastName}` },
      ],
    };

    try {
      const newUser = await this.cognito.signUp(params).promise();
      await this.cognito
        .adminAddUserToGroup({
          UserPoolId: this.userPoolId,
          Username: email,
          GroupName: role,
        })
        .promise();

      delete user.password;
      await this.userService.createForSignup({
        ...user,
        cognitoId: newUser?.UserSub,
        role,
      });

      return successResponse(201, 'Success', {});
    } catch (error) {
      throw new RpcException(error);
    }
  }

  public async confirmUserEmail(email: string) {
    const params: AdminUpdateUserAttributesRequest = {
      UserPoolId: this.userPoolId,
      Username: email,
      UserAttributes: [
        {
          Name: 'email_verified',
          Value: 'true',
        },
      ],
    };

    try {
      const confirmEmailResponse = await this.cognito
        .adminUpdateUserAttributes(params)
        .promise();

      return successResponse(
        HttpStatus.OK,
        ResponseMessage.SUCCESS,
        confirmEmailResponse
      );
    } catch (err) {
      throw new RpcException(err);
    }
  }

  public async adminConfirmPassword(email: string) {
    return this.cognito
      .adminConfirmSignUp({
        UserPoolId: this.userPoolId,
        Username: email,
      })
      .promise();
  }

  async forceConfirmUser(email: string) {
    try {
      await this.userRepository.findOneAndUpdate(
        { email },
        {
          $set: {
            igStatus: VerificationStatus.Approved,
            status: UserStatus.ACTIVE,
          },
        }
      );

      await this.adminConfirmPassword(email);
      await this.confirmUserEmail(email);

      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, {});
    } catch (error) {
      throw new RpcException(error);
    }
  }

  public async signin(user: SignInDto) {
    const { email } = user;

    await this.userService.findUserByUniqueFields({ email });

    const secretKey = this.createSecretHash(email);

    const params: InitiateAuthRequest = {
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: this.clientId,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: user.password,
        SECRET_HASH: secretKey,
      },
    };

    try {
      const tokenResult: any = await this.cognito
        .initiateAuth(params)
        .promise();

      const { AccessToken, RefreshToken, IdToken } =
        tokenResult.AuthenticationResult;

      await this.verifyToken(IdToken, 'id');
      // if not verified throw error

      return successResponse(HttpStatus.OK, ResponseMessage.SUCCESS, {
        accessToken: AccessToken,
        refreshToken: RefreshToken,
        user: (await this.userService.loggedInUser({ email })).data,
      });
    } catch (err) {
      throw new RpcException(err);
    }
  }

  public async verifyToken(token: string, verifierType: 'access' | 'id') {
    const verifier = CognitoJwtVerifier.create({
      userPoolId: this.userPoolId,
      clientId: this.clientId,
      tokenUse: verifierType || 'access',
    });
    try {
      const verify = await verifier.verify(token);
      if (!verify) throw new BadRequestException('Invalid Token');

      const user = await this.userService.findUserByUniqueFields({
        cognitoId: verify.sub,
      });

      if (
        user.data.status === UserStatus.ACTIVE &&
        user.data.igStatus === VerificationStatus.Approved
      ) {
        return successResponse(
          HttpStatus.OK,
          ResponseMessage.SUCCESS,
          user?.data
        );
      }

      throw new UnauthorizedException('Not allowed');
    } catch (err) {
      throw new RpcException('Invald Token');
    }
  }
}
