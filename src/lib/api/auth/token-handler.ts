'use server';

import { cookies } from 'next/headers';
import { TOKEN_COOKIE_KEY } from '@/constants';

export async function getBearerToken(): Promise<string | null> {
  const cookieStore = cookies();
  const bearerToken = cookieStore.get(TOKEN_COOKIE_KEY);

  if (bearerToken) {
    return bearerToken.value;
  }

  return null;
}

export async function setBearerToken(token: string): Promise<void> {
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

export async function deleteBearerToken(): Promise<void> {
  cookies().delete(TOKEN_COOKIE_KEY);
}
