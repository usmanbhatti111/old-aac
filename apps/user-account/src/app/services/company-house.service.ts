import { HttpService } from '@nestjs/axios';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';
import { ResponseMessage, successResponse } from '@shared/constants';
import { AxiosRequestConfig } from 'axios';

@Injectable()
export class CompanyHouseService {
  private companyHouseApiKey: string;
  private companyHouseBaseUrl: string;

  constructor(
    private configService: ConfigService,
    private readonly httpService: HttpService
  ) {
    this.companyHouseApiKey = this.configService.get<string>(
      'COMPANY_HOUSE_API_KEY'
    );
    this.companyHouseBaseUrl = this.configService.get<string>(
      'COMPANY_HOUSE_BASE_URL'
    );
  }

  async searchCompanyByName({ name }) {
    const headersRequest = {
      Authorization: this.companyHouseApiKey,
    };
    const apiUrl = `${this.companyHouseBaseUrl}/search/companies?q=${name}`;
    const requestConfig: AxiosRequestConfig | any = {
      method: 'GET',
      headers: headersRequest,
    };

    try {
      const response = await this.httpService.axiosRef.get(
        apiUrl,
        requestConfig
      );
      return successResponse(
        HttpStatus.OK,
        ResponseMessage.SUCCESS,
        response.data
      );
    } catch (err) {
      throw new RpcException(err);
    }
  }

  async searchCompanyByCode({ crn }) {
    const headersRequest = {
      Authorization: this.companyHouseApiKey,
    };
    const apiUrl = `${this.companyHouseBaseUrl}/company/${crn}`;
    const requestConfig: AxiosRequestConfig | any = {
      method: 'GET',
      headers: headersRequest,
    };

    try {
      const response = await this.httpService.axiosRef.get(
        apiUrl,
        requestConfig
      );
      return successResponse(
        HttpStatus.OK,
        ResponseMessage.SUCCESS,
        response.data
      );
    } catch (err) {
      throw new RpcException(err);
    }
  }
}
