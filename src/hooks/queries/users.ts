import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { User } from '@/types/user';
import { makeRequest } from '@/lib/api';
import CoreApiRoutes from '@/lib/api/api-routes';

export function useGetUsers(): UseQueryResult<User[]> {
  const { findAll } = CoreApiRoutes.user;

  return useQuery({
    queryKey: [findAll.path],
    queryFn: async () => {
      return await makeRequest<User[]>(findAll);
    },
  });
}

export function useGetTargetUser(id?: string): UseQueryResult<User> {
  const {
    findAll: { routeById },
  } = CoreApiRoutes.user;
  const { findOne } = routeById(id);

  return useQuery({
    queryKey: [findOne.path],
    queryFn: async () => {
      return await makeRequest<User>(findOne);
    },
    enabled: Boolean(id),
  });
}
