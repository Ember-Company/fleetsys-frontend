import { STATUS_CODES } from '@/constants';
import axios, { AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios';

import type { ApiMeta, Response } from '@/types/api';

import { handleHttpErrors } from '../error-handler';
import { getBackendURL } from '../get-site-url';
import { Logger } from '../logger';

const logger = new Logger({
  level: 'DEBUG',
  prefix: 'Response Interceptor:',
  showLevel: true,
});

export const CoreAPI = axios.create({
  baseURL: getBackendURL(),
  withCredentials: true,
  withXSRFToken: true,
  responseType: 'json',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

CoreAPI.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    logger.error(error);
    return handleHttpErrors(error);
  }
);

export const NextAPI = axios.create({
  baseURL: `http://localhost:3000/api/`,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

NextAPI.interceptors.response.use(
  (response) => {
    return response.data as AxiosResponse;
  },
  (error: AxiosError) => {
    return handleHttpErrors(error);
  }
);

export async function makeRequest<R, P = void>(
  requestParams: ApiMeta | boolean = false,
  payload?: P | AxiosRequestConfig
): Promise<R> {
  if (typeof requestParams === 'boolean') {
    if (!requestParams) {
      throw new Error('Empty Conditional request');
    }

    return {} as R; // cancel the request
  }

  const { method, path } = requestParams;
  const { data: res, ...metadata }: AxiosResponse<Response<R>> = await CoreAPI[method](path, payload ?? {});

  if (!res?.data) {
    if (metadata.status !== STATUS_CODES.NO_CONTENT) {
      throw new AxiosError(metadata.statusText, metadata.status.toString());
    }

    return {} as R;
  }

  return res.data;
}
