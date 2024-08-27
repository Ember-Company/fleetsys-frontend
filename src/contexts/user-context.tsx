'use client';

import * as React from 'react';

import { type NavItemConfig } from '@/types/nav';
import type { User } from '@/types/user';
import getAppLayout from '@/lib/get-app-layout';
import { useGetSession, useGetUser } from '@/hooks/queries';

export interface UserContextValue {
  user: User | undefined;
  isError: boolean;
  error: Error | null;
  isLoading: boolean;
  checkSession?: () => Promise<void>;
  appLayout: NavItemConfig[];
}

export const UserContext = React.createContext<UserContextValue | undefined>(undefined);

export interface UserProviderProps {
  children: React.ReactNode;
}

export function UserProvider({ children }: UserProviderProps): React.JSX.Element {
  const { isFetched, isLoading: isSessionLoading } = useGetSession();
  const { data: user, isLoading, isError, error } = useGetUser({ enabled: isFetched, retry: 1 });

  const appLayout = React.useMemo(() => {
    if (user) {
      return getAppLayout(user.role);
    }

    return [];
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user: isError ? undefined : user,
        isLoading: !isSessionLoading ? isLoading : isSessionLoading,
        isError,
        error,
        appLayout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const UserConsumer = UserContext.Consumer;
