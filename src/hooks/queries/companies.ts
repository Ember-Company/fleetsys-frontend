'use client';

import { useMutation, UseMutationResult, useQuery, useQueryClient } from '@tanstack/react-query';

import type { QueryResult } from '@/types/api';
import type { Company, CompanyPayload } from '@/types/company';
import { makeRequest } from '@/lib/api';
import CoreApiRoutes from '@/lib/api/api-routes';

export const useGetCompanies = (): QueryResult<Company[]> => {
  const { listCompanies } = CoreApiRoutes.companies;

  return useQuery({
    queryKey: [listCompanies.path],
    queryFn: async () => {
      return await makeRequest<Company[]>(listCompanies);
    },
  });
};

export const useCreateCompany = (): UseMutationResult<Company, Error, CompanyPayload> => {
  const { createCompany, listCompanies } = CoreApiRoutes.companies;
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [createCompany.path],
    mutationFn: async (companyPayload) => {
      return await makeRequest<Company, CompanyPayload>(createCompany, companyPayload);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [listCompanies.path],
      });
    },
  });
};
