import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PermissionRepository, ProductsRepository } from '@shared';
import { ResponseMessage, successResponse } from '@shared/constants';

import * as fs from 'fs';

@Injectable()
export class PermissionService {
  constructor(
    private permissionRepository: PermissionRepository,
    private productsRepository: ProductsRepository
  ) {}

  async addAllPermissions() {
    try {
      const res = await this.permissionRepository.find();

      const permissiosJson = `${process.cwd()}/rolesAndRights.json`;
      const allPermissions = JSON.parse(
        fs.readFileSync(permissiosJson, 'utf8')
      );

      let permissionModule = '';
      let permissionSubModule = '';
      let permissionProduct = '';
      for (const permission of allPermissions) {
        const res = await this.permissionRepository.findOneWithoutException({
          slug: permission['Slugs'],
        });
        if (res) continue;

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

        const allProducts = await this.productsRepository.find();

        for (const product of allProducts) {
          if (
            permissionProduct
              ?.toLowerCase()
              .includes(product?.name?.toLowerCase())
          )
            permissionProduct = product?.id;
        }

        await this.permissionRepository.create({
          module: permissionModule,
          subModule: permissionSubModule
            ? permissionSubModule
            : permissionModule,
          productId: permissionProduct,
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
