'use client';

import { QueryClient } from '@tanstack/react-query';

export * from './companies';
export * from './vehicles';
export * from './auth';
export * from './v-status';
export * from './v-types';
export * from './users';

export const queryClient = new QueryClient();
