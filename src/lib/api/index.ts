import axios, { AxiosResponse } from 'axios';

import { getBackendURL } from '../get-site-url';
import { Logger } from '../logger';
import { getBearerToken } from './auth/token-handler';

const CoreAPI = axios.create({
  baseURL: getBackendURL(),
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

CoreAPI.interceptors.request.use(
  (config) => {
    const token = getBearerToken();

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    const logger = new Logger({
      level: 'ERROR',
      prefix: 'Request Interceptor:',
      showLevel: true,
    });

    logger.error(error);
  }
);

CoreAPI.interceptors.response.use(
  (response) => {
    return response.data as AxiosResponse;
  },
  (error: Error) => {
    const logger = new Logger({
      level: 'DEBUG',
      prefix: 'Response Interceptor:',
      showLevel: true,
    });

    logger.debug(error);
    return Promise.reject(error);
  }
);

export default CoreAPI;
