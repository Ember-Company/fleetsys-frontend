import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationResult,
  type UseQueryResult,
} from '@tanstack/react-query';

import { type VehicleType, type VehicleTypePayload } from '@/types/vehicles';
import { makeRequest } from '@/lib/api';
import CoreApiRoutes from '@/lib/api/api-routes';

export function useGetVehicleTypes(): UseQueryResult<VehicleType[]> {
  const { find } = CoreApiRoutes.vehicleType;

  return useQuery({
    queryKey: [find.path],
    queryFn: async () => {
      return await makeRequest<VehicleType[]>(find);
    },
  });
}

export function useGetTargetVehicleType(id?: string): UseQueryResult<VehicleType> {
  const {
    find: { routeById },
  } = CoreApiRoutes.vehicleType;
  const { findOne } = routeById(id);

  return useQuery({
    queryKey: [findOne.path],
    queryFn: async () => {
      return await makeRequest<VehicleType>(findOne);
    },
    enabled: Boolean(id),
  });
}

export function useCreateVehicleType(): UseMutationResult<VehicleType, Error, VehicleTypePayload> {
  const { create, find } = CoreApiRoutes.vehicleType;
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [create.path],
    mutationFn: async (vehicleTypePayload) => {
      return await makeRequest<VehicleType, VehicleTypePayload>(create, vehicleTypePayload);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [find.path],
      });
    },
  });
}

export function useUpdateVehicleType(id?: string): UseMutationResult<unknown, Error, VehicleTypePayload> {
  if (!id) throw Error('No Id provided');
  const {
    create: { routeById },
    find,
  } = CoreApiRoutes.vehicleType;
  const { update } = routeById(id);
  const { findOne } = find.routeById(id);

  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [update.path],
    mutationFn: async (vehicleTypePayload) => {
      return await makeRequest<unknown, VehicleTypePayload>(update, vehicleTypePayload);
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

    // enabled: Boolean(id),
  });
}

export function useDeleteVehicleType(id?: string): UseMutationResult {
  if (!id) throw Error('No Id provided');
  const {
    create: { routeById },
    find,
  } = CoreApiRoutes.vehicleType;
  const { remove } = routeById(id);
  const queryClient = useQueryClient();

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
