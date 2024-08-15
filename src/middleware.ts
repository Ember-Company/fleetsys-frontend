import { NextResponse, type NextRequest } from 'next/server';

import { CoreAPI } from './lib/api';
import { getBearerToken } from './lib/api/auth/token-handler';

const protectedRoutes = ['/dashboard'];
const publicRoutes = ['/auth', '/'];

CoreAPI.interceptors.request.use(
  (config) => {
    const token = getBearerToken();

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  }
  // (error) => {
  //   logger.error(error);
  // }
);

export default async function middleware(req: NextRequest): Promise<NextResponse> {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const token = getBearerToken();

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/auth/sign-in', req.nextUrl));
  }

  if (isPublicRoute && token && !req.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
