import { AxiosError } from 'axios';

export interface IServiceError {
  headers: string;
  code: string | number;
  message: string;
  isError: boolean;
  data: any;
}

export type ErrorResponse = {
  headers: any;
  message: any;
  status: number | string | undefined;
  data: IServiceError;
};

export function catchAxiosError(err: AxiosError | IServiceError): {
  error: ErrorResponse;
} {
  // Something happened in setting up the request that triggered an Error
  const error = {
    headers: null,
    message:
      'Something happened in setting up the request that triggered an Error',
    status: 0
  } as ErrorResponse;

  if (err && (err as AxiosError).response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    const axiosError = err as AxiosError;
    error.headers = axiosError.response?.headers;
    error.status = axiosError.response?.status;

    error.message =
      (axiosError.response?.data as any)?.Message ||
      'Something happened in setting up the request that triggered an Error';
    error.data = (axiosError.response?.data as any)?.Data;
  } else if (err && (err as AxiosError).request) {
    // The request was made but no response was received
    // `err.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    const axiosError = err as AxiosError;
    error.headers = axiosError.request.headers;
    error.message = 'The request was made, but no response was received';
  } else if (err && (err as IServiceError).isError) {
    const serviceError = err as IServiceError;
    error.headers = serviceError.headers;
    error.message = serviceError.message;
    error.status = `${serviceError.code}`;
  }

  return { error };
}
