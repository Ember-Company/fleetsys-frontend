import type { User, UserPayload } from '@/types/user';
import { Logger } from '@/lib/logger';

import { makeRequest } from '..';
import CoreApiRoutes from '../api-routes';

const logger = new Logger({
  level: 'DEBUG',
  prefix: 'Auth Request: ',
  showLevel: true,
});

class AuthClient {
  async signUp(userData: UserPayload): Promise<User> {
    const { register } = CoreApiRoutes.auth;
    const { data } = await makeRequest<User, UserPayload>(register, userData);

    logger.debug(data);
    return data;
  }

  async login(userData: UserPayload): Promise<User> {
    const { login } = CoreApiRoutes.auth;
    const { data } = await makeRequest<User, UserPayload>(login, userData);

    logger.debug(data);
    return data;
  }

  async getUser(): Promise<User> {
    const { showUser } = CoreApiRoutes.user;
    const { data } = await makeRequest<User>(showUser);

    return data;
  }

  async signOut(): Promise<void> {
    const { logout } = CoreApiRoutes.auth;
    const { metadata } = await makeRequest<unknown>(logout);

    if (metadata.status === 204) {
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
