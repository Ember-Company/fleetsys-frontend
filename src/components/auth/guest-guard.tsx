'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Alert from '@mui/material/Alert';

import { paths } from '@/paths';
import { logger } from '@/lib/default-logger';
import { useGetUser } from '@/hooks/queries/auth';
import { useUser } from '@/hooks/use-user';

export interface GuestGuardProps {
  children: React.ReactNode;
}

export function GuestGuard({ children }: GuestGuardProps): React.JSX.Element | null {
  const router = useRouter();
  const { user, error, isLoading } = useUser();
  // const { data: user, error, isLoading } = useGetUser();
  const [isChecking, setIsChecking] = React.useState<boolean>(true);

  const checkPermissions = async (): Promise<void> => {
    if (isLoading) {
      return;
    }

    if (user) {
      logger.debug('[GuestGuard]: User is logged in, redirecting to dashboard');
      router.replace(user.role === 'MASTER' ? paths.dashboard.clients : paths.dashboard.overview);
      return;
    }

    setIsChecking(false);
  };

  React.useEffect(() => {
    checkPermissions().catch(() => {
      logger.debug('Checking permissions failed');
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
  }, [user, error, isLoading]);

  if (isChecking) {
    return null;
  }

  // if (error) {
  //   return <Alert color="error">{error.message}</Alert>;
  // }

  return <React.Fragment>{children}</React.Fragment>;
}
