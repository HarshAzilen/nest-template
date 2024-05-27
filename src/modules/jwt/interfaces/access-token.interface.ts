import { ITokenBase } from './token-base.interface';

export interface IAccessPayload {
  id: string;
  roleId: string;
}

export interface IAccessToken extends IAccessPayload, ITokenBase {}
