'use client';

import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationResult,
  type UseQueryResult,
} from '@tanstack/react-query';

import { type ApiMeta } from '@/types/api';
import { type VehicleStatus, type VehicleStatusPayload } from '@/types/vehicles';
import { makeRequest } from '@/lib/api';
import CoreApiRoutes from '@/lib/api/api-routes';

export function useGetVehicleStatuses(): UseQueryResult<VehicleStatus[]> {
  const { listVehicleStatus } = CoreApiRoutes.vehicleStatus;
  return useQuery({
    queryKey: [listVehicleStatus.path],
    queryFn: async () => {
      return await makeRequest<VehicleStatus[]>(listVehicleStatus);
    },
  });
}

export function useCreateVehicleStatus(): UseMutationResult<VehicleStatus, Error, VehicleStatusPayload> {
  const { listVehicleStatus, createVehicleStatus } = CoreApiRoutes.vehicleStatus;
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [createVehicleStatus.path],
    mutationFn: async (vStatusPayload) => {
      return await makeRequest<VehicleStatus, VehicleStatusPayload>(createVehicleStatus, vStatusPayload);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [listVehicleStatus.path],
      });
    },
  });
}

export function useEditVehicleStatus(id?: string): UseMutationResult<unknown, Error, Partial<VehicleStatusPayload>> {
  if (!id) throw Error('No Id provided');

  const { listVehicleStatus, createVehicleStatus } = CoreApiRoutes.vehicleStatus;
  const editOne: ApiMeta = {
    path: `${createVehicleStatus.path}/${id}`,
    method: 'put',
  };

  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [editOne.path],
    mutationFn: async (vStatusPayload) => {
      return await makeRequest<unknown, Partial<VehicleStatusPayload>>(editOne, vStatusPayload);
    },
    onSuccess: async () => {
      return Promise.all([
        queryClient.invalidateQueries({
          queryKey: [listVehicleStatus.path],
        }),
        queryClient.invalidateQueries({
          queryKey: [`${listVehicleStatus.path}/${id ?? ''}`],
        }),
      ]);
    },
  });
}

export function useGetTargetVehicleStatus(id?: string): UseQueryResult<VehicleStatus> {
  const { listVehicleStatus } = CoreApiRoutes.vehicleStatus;
  const findOne: ApiMeta = {
    path: `${listVehicleStatus.path}/${id ?? ''}`,
    method: 'get',
  };

  return useQuery({
    queryKey: [findOne.path],
    queryFn: async () => {
      return await makeRequest<VehicleStatus>(findOne);
    },
    enabled: Boolean(id),
  });
}
