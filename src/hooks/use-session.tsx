import React from 'react';

import { SessionContext, SessionProviderContext } from '@/contexts/session-context';

export function useSession(): SessionProviderContext {
  const context = React.useContext(SessionContext);

  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }

  return context;
}
