'use client';

import React, { createContext, useEffect, useState, type PropsWithChildren } from 'react';

import { useGetSession } from '@/hooks/queries/auth';

export interface SessionProviderContext {
  isSession: boolean;
}

export const SessionContext = createContext<SessionProviderContext | undefined>(undefined);

function SessionProvider({ children }: PropsWithChildren): React.JSX.Element {
  const { status } = useGetSession();
  const [isSession, setIsSession] = useState<boolean>(false);

  useEffect(() => {
    if (status === 'success') {
      setIsSession(true);
    }
  }, [setIsSession, status]);

  return <SessionContext.Provider value={{ isSession }}>{children}</SessionContext.Provider>;
}

export default SessionProvider;
