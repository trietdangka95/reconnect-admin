import { ErrorResponse } from './error';

export interface IResponse {
  data?: any;
  error?: ErrorResponse;
}

export type IDataResponse = {
  Code: string;
  Data: any;
  Message: string;
  StatusCode: number;
};
