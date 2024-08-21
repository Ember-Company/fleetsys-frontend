import { UseQueryResult } from '@tanstack/react-query';
import type { AxiosError, AxiosResponse } from 'axios';

export type RequestMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

export interface ApiMeta {
  path: string;
  method: RequestMethod;
}

type ApiName = Record<string, ApiMeta>;
export type ApiGroup = Readonly<Record<string, ApiName>> | Readonly<ApiName>;

// export interface Response<T> {
//   data: T | null;
//   metadata: Partial<AxiosResponse> | null;
//   error?: AxiosError | Error | null;
// }

export interface Response<T> extends AxiosResponse<T> {}

export type NoContent = Omit<Response<never>, 'data'>;
export type QueryResult<T> = UseQueryResult<Response<T>>;

export type StatusCodes = Record<string, number>;
