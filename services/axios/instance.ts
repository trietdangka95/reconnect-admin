import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios';

import { IDataResponse } from './entities';
import { IServiceError } from './error';
import { HTTP_STATUS_CODE } from '../../constants/HTTPStatusCode';

export default abstract class HttpClient {
  protected readonly instance: AxiosInstance;
  protected readonly token?: string;

  constructor({
    baseURL,
    token,
    serviceRole = ''
  }: {
    baseURL?: string;
    token?: string;
    serviceRole?: '' | 'Ops' | 'Sales' | 'Finances' | string;
  }) {
    this.instance = axios.create({
      baseURL: `${baseURL}${serviceRole}`,
      headers: {
        'content-type': 'application/json'
      },
      paramsSerializer: (params) =>
        JSON.stringify(params)
    });
    this.token = token || '';
    this.requestInterceptor();
    this.responseInterceptor();
  }

  private requestInterceptor = () => {
    this.instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const session =
        sessionStorage.getItem('REConnect-app') ||
        this.token;
      (config.headers as any).Authorization = `${session}`;
      (config.headers as any)['Accept-Language'] = `${localStorage.getItem(
        'i18nextLng'
      )}`;
      (config.headers as any)[
        'ActiveRole'
      ] = `${sessionStorage.getItem('ActiveRole')}`;
      (config.headers as any)['Accept-Timezone'] = tz;

      return config;
    });
  };

  /*
   * When response code is 401, try to refresh the token.
   * Eject the interceptor so it doesn't loop in case
   * token refresh causes the 401 response
   */
  // axios.interceptors.response.eject(interceptor);
  private responseInterceptor = () => {
    this.instance.interceptors.response.use(
      this._handleResponse,
      this.handleError
    );
  };
  private _handleResponse = ({ data, config }: AxiosResponse): any => {
    const res = data as IDataResponse;
    const resHeaders = config.url;
    if (res.Code !== 'Success' && res.Code !== '200') {
      const error = {
        headers: resHeaders,
        message: res.Message,
        isError: true,
        data: res.Data,
        code: res.Code
      } as IServiceError;

      return Promise.reject(error);
    }

    return { data: res.Data };
  };

  protected handleError = (error: AxiosError): void => {
    const parsedHash = location.hash.split('?');
    const isForbidden = location.hash.split('/');

    if (
      error &&
      error.response?.status === HTTP_STATUS_CODE.FORBIDDEN &&
      parsedHash.length > 0 &&
      isForbidden[isForbidden.length - 1] !== `${HTTP_STATUS_CODE.FORBIDDEN}`
    ) {
      location.replace(`${parsedHash}/${HTTP_STATUS_CODE.FORBIDDEN}`);
    }

    throw error;
  };
}
