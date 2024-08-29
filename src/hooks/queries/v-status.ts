'use client';

import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationResult,
  type UseQueryResult,
} from '@tanstack/react-query';

import { type VehicleStatus, type VehicleStatusPayload } from '@/types/vehicles';
import { makeRequest } from '@/lib/api';
import CoreApiRoutes from '@/lib/api/api-routes';

export function useGetVehicleStatuses(): UseQueryResult<VehicleStatus[]> {
  const { find } = CoreApiRoutes.vehicleStatus;

  return useQuery({
    queryKey: [find.path],
    queryFn: async () => {
      return await makeRequest<VehicleStatus[]>(find);
    },
  });
}

export function useCreateVehicleStatus(): UseMutationResult<VehicleStatus, Error, VehicleStatusPayload> {
  const { find, create } = CoreApiRoutes.vehicleStatus;
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [create.path],
    mutationFn: async (vStatusPayload) => {
      return await makeRequest<VehicleStatus, VehicleStatusPayload>(create, vStatusPayload);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [find.path],
      });
    },
  });
}

export function useEditVehicleStatus(id?: string): UseMutationResult<unknown, Error, Partial<VehicleStatusPayload>> {
  if (!id) throw Error('No Id provided');

  const {
    create: { routeById },
    find,
  } = CoreApiRoutes.vehicleStatus;
  const { update } = routeById(id);
  const { findOne } = find.routeById(id);

  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [update.path],
    mutationFn: async (vStatusPayload) => {
      return await makeRequest<unknown, Partial<VehicleStatusPayload>>(update, vStatusPayload);
    },
    onSuccess: async () => {
      return Promise.all([
        queryClient.invalidateQueries({
          queryKey: [find.path],
        }),
        queryClient.invalidateQueries({
          queryKey: [findOne.path],
        }),
      ]);
    },
  });
}

export function useGetTargetVehicleStatus(id?: string): UseQueryResult<VehicleStatus> {
  const {
    find: { routeById },
  } = CoreApiRoutes.vehicleStatus;
  const { findOne } = routeById(id);

  return useQuery({
    queryKey: [findOne.path],
    queryFn: async () => {
      return await makeRequest<VehicleStatus>(findOne);
    },
    enabled: Boolean(id),
  });
}

export function useDeleteVehicleStatus(id?: string): UseMutationResult {
  const queryClient = useQueryClient();
  const {
    find,
    create: { routeById },
  } = CoreApiRoutes.vehicleStatus;
  const { remove } = routeById(id);

  return useMutation({
    mutationKey: [remove.path],
    mutationFn: async () => {
      return await makeRequest<unknown>(remove);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [find.path],
      });
    },
  });
}
