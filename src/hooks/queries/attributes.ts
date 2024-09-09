import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';

import { AttributePayload, VehicleTypeAttribute } from '@/types/vehicles';
import { makeRequest } from '@/lib/api';
import CoreApiRoutes from '@/lib/api/api-routes';

export function useGetAttributes(): UseQueryResult<VehicleTypeAttribute[]> {
  const { find } = CoreApiRoutes.attributes;

  return useQuery({
    queryKey: [find.path],
    queryFn: async () => {
      return await makeRequest<VehicleTypeAttribute[]>(find);
    },
  });
}

export function useCreateAttribute(): UseMutationResult<VehicleTypeAttribute, Error, AttributePayload> {
  const { create, find } = CoreApiRoutes.attributes;
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [create.path],
    mutationFn: async (attributePayload) => {
      return await makeRequest<VehicleTypeAttribute, AttributePayload>(create, attributePayload);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [find.path],
      });
    },
  });
}
