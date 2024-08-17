import { STATUS_CODES } from '@/constants';
import type { AxiosResponse } from 'axios';

import type { NoContent, Response } from '@/types/api';
import type { LoginResponse, User, UserPayload } from '@/types/user';
import { makeRequest } from '@/lib/api';
import CoreApiRoutes from '@/lib/api/api-routes';
import { Logger } from '@/lib/logger';

const logger = new Logger({
  level: 'DEBUG',
  prefix: 'Auth Request: ',
  showLevel: true,
});

class AuthClient {
  async login(userData: UserPayload): Promise<Response<LoginResponse>> {
    const { login } = CoreApiRoutes.auth;

    return makeRequest<LoginResponse, UserPayload>(login, userData);
  }

  async getSession(): Promise<NoContent> {
    const { csrfCookie } = CoreApiRoutes.auth;

    return await makeRequest<NoContent>(csrfCookie);
  }

  async getUser(): Promise<Response<User>> {
    const { showUser } = CoreApiRoutes.user;

    return await makeRequest<User>(showUser);
  }

  async signOut(): Promise<void> {
    const { logout } = CoreApiRoutes.auth;
    const { metadata } = await makeRequest<AxiosResponse>(logout);

    if (metadata?.status === 204) {
      return;
    }

    logger.error('Failed to logout');
  }
}

// async resetPassword(_: ResetPasswordParams): Promise<{ error?: string }> {
//   return { error: 'Password reset not implemented' };
// }

// async updatePassword(_: ResetPasswordParams): Promise<{ error?: string }> {
//   return { error: 'Update reset not implemented' };
// }

export const authClient = new AuthClient();
