import { AxiosResponse } from 'axios';

export type RequestMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

export interface ApiMeta {
  path: string;
  method: RequestMethod;
}

type ApiName = Record<string, ApiMeta>;
export type ApiGroup = Readonly<Record<string, ApiName>> | Readonly<ApiName>;

export interface Response<T> {
  data: T;
  metadata: Partial<AxiosResponse>;
}
