import { STATUS_CODES } from '@/constants';
import axios, { AxiosRequestConfig, type AxiosError, type AxiosResponse } from 'axios';

import type { ApiMeta, NoContent, Response } from '@/types/api';

import { handleHttpErrors } from '../error-handler';
import { getBackendURL } from '../get-site-url';
import { Logger } from '../logger';
import { getBearerToken } from './auth/token-handler';

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

CoreAPI.interceptors.request.use((config) => {
  logger.debug(config);

  return config;
});

CoreAPI.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
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
  payload?: P
): Promise<Response<R>> {
  try {
    if (typeof requestParams === 'boolean') {
      if (!requestParams) {
        throw new Error('Empty Conditional request');
      }

      return {} as Response<R>; // cancel the request
    }

    const { method, path } = requestParams;
    const { data, ...metadata }: AxiosResponse<R> = await CoreAPI[method](path, payload ?? {});

    return {
      data,
      error: null,
      metadata,
    };
  } catch (e: unknown) {
    let error = e as Error;

    if (axios.isAxiosError(error)) {
      error = e as AxiosError;
      logger.error('Axios error occurred:', error);
    } else {
      logger.error('Unknown error occurred:', error);
    }

    return {
      data: null,
      metadata: null,
      error,
    };
  }
}
