export type RequestMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

export interface ApiRoute {
  path: string;
  method: RequestMethod;
}

export type ApiRouteList = Readonly<Record<string, ApiRoute>>;
