import { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import type { AxiosError, AxiosResponse } from 'axios';

export type RequestMethod = 'get' | 'post' | 'put' | 'patch' | 'delete' | 'options' | 'head';

export interface ApiMeta {
  path: string;
  method: RequestMethod;
  routeById?: (param: string) => ApiGroup;
}

type ApiName = Record<string, ApiMeta>;
export type ApiGroup = Readonly<Record<string, ApiName>> | Readonly<ApiName>;

export interface Response<T> {
  data: T;
  metadata: Partial<AxiosResponse>;
}

export type QueryConfig<DataT> = Omit<UseQueryOptions<DataT>, 'queryKey' | 'queryFn'> | undefined;

export type NoContent = Omit<Response<never>, 'data'>;
export type QueryResult<T> = UseQueryResult<T>;

export type StatusCodes = Record<string, number>;
