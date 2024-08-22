'use client';

import React, { useMemo } from 'react';
import { DataGrid, GridToolbar, type GridColDef } from '@mui/x-data-grid';

import type { Company } from '@/types/company';
import { useGetCompanies } from '@/hooks/queries';

const VISIBLE_FIELDS = ['name', 'users_count', 'vehicles_count', 'active'];
const dataColumns: GridColDef<Company[][number]>[] = [
  { field: 'name', headerName: 'Name', width: 200, editable: false, sortable: true, type: 'string' },
  {
    field: 'users_count',
    headerName: 'Employee Amount',
    width: 200,
    editable: false,
    sortable: true,
    type: 'number',
    align: 'left',
    headerAlign: 'left',
  },
  {
    field: 'vehicles_count',
    headerName: 'Vehicle Amount',
    width: 200,
    editable: false,
    sortable: true,
    type: 'number',
    align: 'left',
    headerAlign: 'left',
  },
  {
    field: 'active',
    headerName: 'Active Status',
    width: 200,
    editable: true,
    sortable: true,
    type: 'boolean',
    align: 'left',
    headerAlign: 'left',
  },
];

export default function CompanyList(): React.JSX.Element {
  const { data, isLoading } = useGetCompanies();

  const columns = useMemo(() => {
    return dataColumns.filter((col) => VISIBLE_FIELDS.includes(col.field));
  }, []);

  return (
    <DataGrid
      columns={columns}
      rows={data}
      loading={isLoading}
      pageSizeOptions={[5, 10, 25, 50]}
      autoHeight
      disableColumnFilter
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
          showQuickFilter: true,
        },
      }}
      slots={{
        toolbar: GridToolbar,
      }}
    />
  );
}
