import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';

import { UpdateUserPayload, User } from '@/types/user';
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

export function useUpdateUser(id?: string): UseMutationResult<unknown, Error, UpdateUserPayload> {
  const {
    findAll: { routeById },
    showUser,
  } = CoreApiRoutes.user;
  const { updateUser, findOne } = routeById(id);
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [updateUser.path],
    mutationFn: async (payload) => {
      return await makeRequest<unknown, UpdateUserPayload>(updateUser, payload);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [findOne.path],
      });
      await queryClient.invalidateQueries({
        queryKey: [showUser.path],
      });
    },
  });
}

export function useDeleteUser(id?: string): UseMutationResult {
  const { findAll } = CoreApiRoutes.user;
  const { deleteUser } = findAll.routeById(id);
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [deleteUser.path],
    mutationFn: async () => {
      return await makeRequest<unknown>(deleteUser);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [findAll.path],
      });
    },
  });
}
