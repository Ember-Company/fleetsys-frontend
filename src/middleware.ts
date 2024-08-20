import next from 'next';
import { NextResponse, type NextRequest } from 'next/server';

import { authClient } from './lib/api/auth/client';
import { getBearerToken } from './lib/api/auth/token-handler';
import { logger } from './lib/default-logger';

// function isProtectedRoute(path: string): boolean {
//   let result = false;
//   protectedRoutes.forEach((r) => {
//     if (path.startsWith(r)) {
//       result = true;
//       return result;
//     }
//   });

//   return result;
// }

function isProtectedRoute(path: string): boolean {
  const protectedRoutes = ['/dashboard'];
  return protectedRoutes.some((route) => path.startsWith(route));
}

function isPublicRoute(path: string): boolean {
  const publicRoutes = ['/auth'];
  return publicRoutes.some((route) => path.startsWith(route));
}

async function handleRedirects(req: NextRequest): Promise<NextResponse> {
  const ignoredRoutes = ['/favicon.ico'];
  const { pathname } = req.nextUrl;

  if (ignoredRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  const token = await getBearerToken();

  try {
    const isAuthenticated = Boolean(token) && (await authClient.getSession());

    if (isProtectedRoute(pathname) && !isAuthenticated) {
      return NextResponse.redirect(new URL('/auth/sign-in', req.url));
    }

    if (isPublicRoute(pathname) && isAuthenticated) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  } catch (error) {
    logger.error('Error during authentication check', error);
    return NextResponse.redirect(new URL('/auth/sign-in', req.url));
  }

  return NextResponse.next();
}

export default async function middleware(req: NextRequest): Promise<NextResponse> {
  // return await handleRedirects(req);
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
