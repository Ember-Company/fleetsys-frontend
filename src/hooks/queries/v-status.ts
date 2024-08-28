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
