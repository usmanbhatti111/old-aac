import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ImportFileRepository } from '@shared';
import { IMPORT_FILE_URL, ResponseMessage, successResponse } from '@shared/constants';
import { ImportFileDTO } from '@shared/dto';
import axios from 'axios';

@Injectable()
export class ImportFileService {
  constructor(private importFile: ImportFileRepository) {}

  async createImportFile(payload: ImportFileDTO) {
    try {
      const res = await this.importFile.create(payload);
      const apiUrl = IMPORT_FILE_URL.DEALS + res._id;
   
      axios.get(apiUrl, {})
        .then((response) => {
          console.log('API call successful:', response.data);
        })
        .catch((error) => {
          console.error('Error calling API:', error.message);
        });

      return successResponse(HttpStatus.CREATED, ResponseMessage.CREATED, res);
    } catch (error) {
      throw new RpcException(error);
    }
  }

}
