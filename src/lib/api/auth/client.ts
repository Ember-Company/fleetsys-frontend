import type { NoContent } from '@/types/api';
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
  async login(userData: UserPayload): Promise<LoginResponse> {
    const { login } = CoreApiRoutes.auth;

    return await makeRequest<LoginResponse, UserPayload>(login, userData);
  }

  async getSession(): Promise<NoContent> {
    const { csrfCookie } = CoreApiRoutes.auth;

    return await makeRequest<NoContent>(csrfCookie);
  }

  async getUser(): Promise<User> {
    const { showUser } = CoreApiRoutes.user;

    return await makeRequest<User>(showUser);
  }

  async signOut(): Promise<NoContent> {
    const { logout } = CoreApiRoutes.auth;

    return await makeRequest<NoContent>(logout);
  }
}

// async resetPassword(_: ResetPasswordParams): Promise<{ error?: string }> {
//   return { error: 'Password reset not implemented' };
// }

// async updatePassword(_: ResetPasswordParams): Promise<{ error?: string }> {
//   return { error: 'Update reset not implemented' };
// }

export const authClient = new AuthClient();
