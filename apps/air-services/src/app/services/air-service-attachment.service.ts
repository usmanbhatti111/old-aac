import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { AttachmentAirRepository } from '@shared';
import { successResponse } from '@shared/constants';
import { AirAttachmentDTO, IdDto } from '@shared/dto';
import { S3Service } from '@shared/services';

@Injectable()
export class AirServiceAttachmentService {
  constructor(
    private airServiceAttachment: AttachmentAirRepository,
    private s3: S3Service
  ) {}

  async addAttachment(payload: { fileUrl: any; dto: AirAttachmentDTO }) {
    try {
      const { fileUrl, ...dto } = payload;
      const details: any = dto.dto;
      const file = await this.s3.uploadFile(fileUrl, `users/attachment/{uuid}`);

      const param = {
        ...details,
        fileUrl: file.url,
        s3UploadObject: file,
      };
      const attachment = await this.airServiceAttachment.create(param);
      const response = successResponse(
        HttpStatus.CREATED,
        `Attachment Added`,
        attachment
      );
      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }
  async getAttachment(payload: IdDto) {
    try {
      const { id } = payload;
      const getAttachment = await this.airServiceAttachment.find({
        recordId: id,
      });
      const response = successResponse(
        HttpStatus.OK,
        `Get Attachment`,
        getAttachment
      );
      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }
  async deleteAttachment(payload: IdDto) {
    try {
      const { id } = payload;
      const deleteAttachment = await this.airServiceAttachment.delete({
        _id: id,
      });
      const response = successResponse(
        HttpStatus.OK,
        `Delete Attachment`,
        deleteAttachment
      );
      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }
  async deleteAllAttachment(payload: IdDto) {
    try {
      const { id }: any = payload;

      const deleteAttachment = await this.airServiceAttachment.delete({
        recordId: id,
      });
      const response = successResponse(
        HttpStatus.OK,
        `Delete Attachment`,
        deleteAttachment
      );
      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
