'use client';

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { paths } from '@/paths';
import { logger } from '@/lib/default-logger';
import { useUser } from '@/hooks/use-user';

export interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps): React.JSX.Element | null {
  const router = useRouter();
  const pathname = usePathname();
  const { appLayout, user, isLoading, error } = useUser();
  const [isChecking, setIsChecking] = React.useState<boolean>(true);

  const permissionAllowed = (): boolean => {
    logger.warn(appLayout);

    return appLayout.some((item) => {
      const current = item.href && item.href.includes(pathname);
      let childState = false;

      if (!current && item.items && item.items.length > 0) {
        childState = item.items.some((child) => child.href && child.href.includes(pathname));
      }

      return current || childState;
    });
  };

  const checkPermissions = async (): Promise<void> => {
    if (isLoading) {
      return;
    }

    if (!user) {
      logger.debug('[AuthGuard]: User is not logged in, redirecting to sign in');
      router.replace(paths.auth.signIn);
      return;
    }
    if (!permissionAllowed()) {
      router.push('/dashboard/not-authorized');
      return;
    }

    setIsChecking(false);
  };

  React.useEffect(() => {
    checkPermissions().catch(() => {
      // noop
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
