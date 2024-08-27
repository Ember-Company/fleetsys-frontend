'use client';

import { useMutation, useQuery, useQueryClient, type UseMutationResult } from '@tanstack/react-query';

import { type QueryResult } from '@/types/api';
import { type Vehicle, type VehiclePayload } from '@/types/vehicles';
import { makeRequest } from '@/lib/api';
import CoreApiRoutes from '@/lib/api/api-routes';

export function useVehiclesIndex(): QueryResult<Vehicle[]> {
  const { listVehicles } = CoreApiRoutes.vehicles;

  return useQuery({
    queryKey: [listVehicles.path],
    queryFn: async () => {
      return await makeRequest<Vehicle[]>(listVehicles);
    },
  });
}

export function useCreateVehicle(): UseMutationResult<Vehicle, Error, VehiclePayload> {
  const { createVehicle, listVehicles } = CoreApiRoutes.vehicles;
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [createVehicle.path],
    mutationFn: async (vehiclePayload: VehiclePayload) => {
      return await makeRequest<Vehicle, VehiclePayload>(createVehicle, vehiclePayload);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [listVehicles.path],
      });
    },
  });
}
