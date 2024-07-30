import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import queryString from 'query-string';

export enum STATUSES {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

enum ERRORS {
  BAD_REQUEST = 'Bad Request',
  INTERNAL_ERROR = 'Internal Error',
}

type TypeMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

export class HttpService {
  apiUrl: string;
  httpClient: AxiosInstance;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
    this.httpClient = axios.create();
  }

  private async execute<T>(
    originMethod: TypeMethod,
    url: string,
    data?: T,
    options?: AxiosRequestConfig
  ): Promise<{ response: T; totalCount: number }> {
    const method = originMethod.toLowerCase() as Lowercase<TypeMethod>;

    const executeMethod = this.httpClient[method];

    if (typeof executeMethod === 'undefined') {
      throw new Error(ERRORS.INTERNAL_ERROR);
    }

    try {
      const request: AxiosResponse = await executeMethod(this.createRequestUrl(url), data, options);

      const response = request.data;
      const totalCount = Number(request.headers['x-total-count']);

      if (this.checkResponse(request)) {
        throw new Error(ERRORS.BAD_REQUEST);
      }

      return { response, totalCount };
    } catch (e) {
      throw new Error(e as string);
    }
  }

  get<T>(url: string, data?: T, options?: AxiosRequestConfig) {
    return this.execute('GET', url, data, options);
  }

  post<T>(url: string, data?: T, options?: AxiosRequestConfig) {
    return this.execute('POST', url, data, options);
  }

  delete<T>(url: string, data?: T, options?: AxiosRequestConfig) {
    return this.execute('DELETE', url, data, options);
  }

  patch<T>(url: string, data?: T, options?: AxiosRequestConfig) {
    return this.execute('PATCH', url, data, options);
  }

  createUrl(url: string, queries?: object): string {
    const preparedQueris = {};

    let queryResult = '';

    if (queries) {
      for (const [query, value] of Object.entries(queries)) {
        const prefix = '_';
        const newQuery = prefix.concat(query);

        preparedQueris[newQuery] = value;
      }

      queryResult = '?' + queryString.stringify(preparedQueris);
    }

    return url + queryResult;
  }

  private createRequestUrl(url: string) {
    const result = this.apiUrl + url;

    return result;
  }

  private checkResponse(response: AxiosResponse): boolean {
    return response.status !== 200 && response.status !== 201;
  }
}
