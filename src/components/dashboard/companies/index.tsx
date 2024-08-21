'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';

import { Company } from '@/types/company';
import { logger } from '@/lib/default-logger';
import { useGetCompanies } from '@/hooks/queries';

interface CompanyRow {
  id: string;
  name: string;
  user_quantity: number;
  vehicle_quantity: number;
}

function buildCompanyRows(data: Company[] | undefined): CompanyRow[] {
  return [];
}

export default function CompanyList(): React.JSX.Element {
  const { data, isLoading, isSuccess } = useGetCompanies();
  // const [rows, setRows] = useState<CompanyRow[]>([]);
  // const [columns, setColumns] = useState<GridColDef<(typeof rows)[number]>[]>();

  const rows = useMemo(() => {
    logger.debug(isLoading);

    logger.debug(data);
    if (!isLoading && data) {
      return data.reduce((acc: CompanyRow[], item): CompanyRow[] => {
        acc.push({
          id: item.id,
          name: item.name,
          user_quantity: item.users.length,
          vehicle_quantity: item.vehicles.length,
        });
        return acc;
      }, []);
    }

    return [];
  }, [data, isLoading]);

  const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: 'name', headerName: 'Name', width: 150, editable: true, sortable: true },
    { field: 'user_quantity', headerName: 'Employee Amount', width: 150, editable: false, sortable: true },
    { field: 'vehicle_quantity', headerName: 'Vehicle Amount', width: 150, editable: false, sortable: true },
  ];

  return (
    <DataGrid
      columns={columns}
      rows={rows}
      loading={isLoading}
      pageSizeOptions={[5, 10, 25, 50]}
      autoHeight
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 10,
            page: 0,
          },
        },
      }}
      slots={{
        toolbar: GridToolbar,
      }}
    />
  );
}
