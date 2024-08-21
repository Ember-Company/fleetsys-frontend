'use client';

import * as React from 'react';

import { NavItemConfig } from '@/types/nav';
import type { Role, User } from '@/types/user';
import { authClient } from '@/lib/api/auth/client';
import { logger } from '@/lib/default-logger';
import getAppLayout from '@/lib/get-app-layout';
import useNavLayout from '@/hooks/use-nav-layout';

export interface UserContextValue {
  user: User | null;
  error: string | null;
  isLoading: boolean;
  checkSession?: () => Promise<void>;
  appLayout: NavItemConfig[];
}

export const UserContext = React.createContext<UserContextValue | undefined>(undefined);

export interface UserProviderProps {
  children: React.ReactNode;
}

export function UserProvider({ children }: UserProviderProps): React.JSX.Element {
  const [state, setState] = React.useState<{ user: User | null; error: string | null; isLoading: boolean }>({
    user: null,
    error: null,
    isLoading: true,
  });
  const [appLayout, setAppLayout] = React.useState<NavItemConfig[]>([]);

  const checkSession = React.useCallback(async (): Promise<void> => {
    try {
      const user = await authClient.getUser();
      logger.debug(user);

      setState((prev) => ({ ...prev, user, error: null, isLoading: false }));
      setAppLayout(getAppLayout(user.role));
    } catch (err) {
      logger.error(err);
      setState((prev) => ({ ...prev, user: null, error: 'Something went wrong', isLoading: false }));
    }
  }, []);

  React.useEffect(() => {
    checkSession().catch((err: unknown) => {
      logger.error(err);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
  }, []);

  return <UserContext.Provider value={{ ...state, checkSession, appLayout }}>{children}</UserContext.Provider>;
}

export const UserConsumer = UserContext.Consumer;
