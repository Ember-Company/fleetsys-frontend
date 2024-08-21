import type { Response } from '@/types/api';
import { type Company } from '@/types/company';

import { makeRequest } from '..';
import CoreApiRoutes from '../api-routes';

export const getCompanies = async (): Promise<Response<Company[]>> => {
  const { listCompanies } = CoreApiRoutes.companies;

  return await makeRequest<Company[]>(listCompanies);
};
