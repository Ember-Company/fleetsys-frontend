'use client';

import { useQuery } from '@tanstack/react-query';

import type { QueryResult } from '@/types/api';
import type { Company } from '@/types/company';
import { makeRequest } from '@/lib/api';
import CoreApiRoutes from '@/lib/api/api-routes';

export const useGetCompanies = (): QueryResult<Company> => {
  const { listCompanies } = CoreApiRoutes.companies;

  return useQuery({
    queryKey: [listCompanies.path],
    queryFn: async () => {
      return await makeRequest<Company>(listCompanies);
    },
  });
};
