'use client';

import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
  UseQueryResult,
  type UseMutationResult,
} from '@tanstack/react-query';

import type { NoContent } from '@/types/api';
import type { LoginResponse, User, UserPayload } from '@/types/user';
import { makeRequest } from '@/lib/api';
import CoreApiRoutes from '@/lib/api/api-routes';
import { logger } from '@/lib/default-logger';

export type QueryConfig<DataT> = Omit<UseQueryOptions<DataT>, 'queryKey' | 'queryFn'> | undefined;

const { showUser: userQuery } = CoreApiRoutes.user;

export function useLoginQuery(): UseMutationResult<LoginResponse, Error, UserPayload> {
  const { login } = CoreApiRoutes.auth;
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [login.path],
    mutationFn: async (userData: UserPayload) => {
      return await makeRequest<LoginResponse, UserPayload>(login, userData);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries([userQuery.path] as InvalidateQueryFilters);
    },
  });
}

export function useLogoutQuery(): UseMutationResult<NoContent> {
  const { logout } = CoreApiRoutes.auth;
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [logout.path],
    mutationFn: async () => {
      return await makeRequest<NoContent>(logout);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [userQuery.path],
      });
    },
  });
}

export function useGetSession(): UseQueryResult {
  const { csrfCookie } = CoreApiRoutes.auth;

  return useQuery({
    queryKey: [csrfCookie.path],
    queryFn: async () => {
      const res = await makeRequest<unknown>(csrfCookie);
      logger.debug(res);

      return res;
    },
  });
}

export function useGetUser(opts: QueryConfig<User> = {}): UseQueryResult<User> {
  const res = useQuery({
    queryKey: [userQuery.path],
    queryFn: async () => {
      return await makeRequest<User>(userQuery);
    },
    ...opts,
  });

  return res;
}
