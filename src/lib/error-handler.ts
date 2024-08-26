import type { AxiosError } from 'axios';

import { Logger } from './logger';

const logger = new Logger({
  level: 'DEBUG',
  prefix: 'Error Handlers: :',
  showLevel: true,
});

export function handleHttpErrors(error: AxiosError): Promise<{ error: string } | Promise<AxiosError>> {
  const { response } = error;

  if (response) {
    switch (response.status) {
      case 401:
        logger.warn('Unauthorized access - 401');
        return Promise.reject(error);
      case 403:
        logger.warn('Forbidden access - 403');
        return Promise.resolve({ error: 'You do not have permission to access this resource.' });
      default:
        logger.error(`Unhandled HTTP status code: ${response.status.toString()}`);
        return Promise.reject(error);
    }
  }
  return Promise.reject(error);
}
