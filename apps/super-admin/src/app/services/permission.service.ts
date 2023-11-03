import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PermissionRepository } from '@shared';
import { ResponseMessage, successResponse } from '@shared/constants';

import * as fs from 'fs';

@Injectable()
export class PermissionService {
  constructor(private permissionRepository: PermissionRepository) {}

  async addAllPermissions() {
    try {
      const res = await this.permissionRepository.find();

      if (res && res[0])
        throw new BadRequestException(`Permissions already added.`);

      const permissiosJson = `${process.cwd()}/rolesAndRights.json`;
      const allPermissions = JSON.parse(
        fs.readFileSync(permissiosJson, 'utf8')
      );

      let permissionModule = '';
      let permissionSubModule = '';
      let permissionProduct = '';
      for (const permission of allPermissions) {
        if (permission['Modules']) permissionModule = permission['Modules'];

        if (permission['Sub Modules'])
          permissionSubModule = permission['Sub Modules'];

        if (
          !permission['Sub Modules'] &&
          !permission['Slugs'] &&
          !permission['Permissions'] &&
          permission['Modules']
        ) {
          permissionProduct = permission['Modules'];
          continue;
        }

        await this.permissionRepository.create({
          module: permissionModule,
          subModule: permissionSubModule
            ? permissionSubModule
            : permissionModule,
          product: permissionProduct,
          slug: permission['Slugs'],
          name: permission['Permissions'],
        });
      }

      const response = successResponse(
        HttpStatus.CREATED,
        ResponseMessage.SUCCESS,
        res
      );
      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
