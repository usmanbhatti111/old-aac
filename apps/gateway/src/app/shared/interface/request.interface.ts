import { Request } from 'express';

export interface AppRequest extends Request {
  user: {
    _id: string;
    firstName: string;
    middleName: string;
    lastName: string;
    role: string;
    organization?: string;
  };
}
