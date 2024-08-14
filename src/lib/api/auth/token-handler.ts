import { cookies } from 'next/headers';
import { TOKEN_COOKIE_KEY } from '@/constants';

export function getBearerToken(): string | null {
  const cookieStore = cookies();
  const bearerToken = cookieStore.get(TOKEN_COOKIE_KEY);

  if (bearerToken) {
    return bearerToken.value;
  }

  return null;
}

export function setBearerToken(token: string): void {
  if (!token) return;

  const maxAge = 60 * 60 * 24; // 24 hours
  const expires = new Date(Date.now() + 60 * 60 * 24 * 1000); // 24 hours from now

  cookies().set({
    name: TOKEN_COOKIE_KEY,
    value: token,
    httpOnly: true,
    path: '/',
    maxAge,
    expires,
  });
}

export function deleteBearerToken(): void {
  cookies().delete(TOKEN_COOKIE_KEY);
}
