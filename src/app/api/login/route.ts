import type { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

import type { UserPayload } from '@/types/user';
import { authClient } from '@/lib/api/auth/client';
import { setBearerToken } from '@/lib/api/auth/token-handler';

export async function POST(req: NextApiRequest): Promise<NextResponse> {
  try {
    const { accessToken, user } = await authClient.login(req.body as UserPayload);
    setBearerToken(accessToken);

    return new NextResponse(JSON.stringify(user));
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        error,
      })
    );
  }
}
