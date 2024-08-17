import { NextResponse, type NextRequest } from 'next/server';

import { CoreAPI } from './lib/api';
import { getBearerToken } from './lib/api/auth/token-handler';
import { logger } from './lib/default-logger';

const protectedRoutes = ['/dashboard'];
const publicRoutes = ['/auth'];
const ignoredRoutes = ['/favicon.ico'];

function isProtectedRoute(path: string): boolean {
  let result = false;
  protectedRoutes.forEach((r) => {
    if (path.startsWith(r)) {
      result = true;
      return result;
    }
  });

  return result;
}

export default async function middleware(req: NextRequest): Promise<NextResponse> {
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
