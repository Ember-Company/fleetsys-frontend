'use client';

import { useEffect } from 'react';

import { logger } from '@/lib/default-logger';
import { useGetCompanies } from '@/hooks/queries';

export default function CompanyList(): React.JSX.Element {
  const { data, isLoading } = useGetCompanies();

  useEffect(() => {
    logger.debug(data);
  }, [isLoading, data]);

  // if (isLoading) return <div>Loading</div>;

  return <h2>Companies List</h2>;
}
