import type { Response } from '@/types/api';
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
  async signUp(userData: UserPayload): Promise<Response<User>> {
    const { register } = CoreApiRoutes.auth;
    return await makeRequest<User, UserPayload>(register, userData);
  }

  async login(userData: UserPayload): Promise<Response<LoginResponse>> {
    const { login } = CoreApiRoutes.auth;
    return await makeRequest<LoginResponse, UserPayload>(login, userData);
  }

  async getUser(): Promise<Response<User>> {
    const { showUser } = CoreApiRoutes.user;
    return await makeRequest<User>(showUser);
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
