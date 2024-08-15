import axios, { type AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios';

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
  responseType: 'json',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

CoreAPI.interceptors.response.use(
  (response) => {
    return response.data as AxiosResponse;
  },
  (error: AxiosError) => {
    return handleHttpErrors(error);
  }
);

export async function makeRequest<R, P = void>(
  { method, path }: ApiMeta,
  payload?: P & AxiosRequestConfig<P>
): Promise<Response<R>> {
  try {
    const { data, ...metadata }: Response<R> = await CoreAPI[method](path, payload);

    return {
      data,
      error: null,
      ...metadata,
    };
  } catch (error: unknown) {
    return {
      data: null,
      metadata: null,
      error: error as AxiosError,
    };
  }
}
