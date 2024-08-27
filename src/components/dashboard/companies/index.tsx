'use client';

import React, { useCallback } from 'react';
import { Button } from '@mui/material';
import { DataGrid, type GridSlots } from '@mui/x-data-grid';

import { type Company } from '@/types/company';
import { logger } from '@/lib/default-logger';
import { useGetCompanies } from '@/hooks/queries';
import { useActionFields } from '@/hooks/tables';
import ToolBar from '@/components/shared/datagrid/tool-bar';

import { getCompaniesTableFields } from './company-columns';

export default function CompanyList(): React.JSX.Element {
  const { data, isLoading } = useGetCompanies();

  const handleDeleteClick = useCallback((id: string) => {
    logger.warn(id);
  }, []);

  const actionCols = useActionFields<Company>([
    {
      name: 'delete',
      handler: handleDeleteClick,
    },
  ]);

  return (
    <DataGrid
      columns={[...getCompaniesTableFields(), ...actionCols]}
      rows={data}
      loading={isLoading}
      pageSizeOptions={[5, 10, 25, 50]}
      autoHeight
      disableColumnFilter
      checkboxSelection
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 10,
            page: 0,
          },
        },
      }}
      slotProps={{
        toolbar: {
          title: 'Company',
        },
      }}
      slots={{
        toolbar: ToolBar as GridSlots['toolbar'],
      }}
    />
  );
}
