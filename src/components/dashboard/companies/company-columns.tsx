import React from 'react';
import { type GridColDef } from '@mui/x-data-grid';

import { type Company } from '@/types/company';
import { type DTableField } from '@/types/tables';

const VISIBLE_FIELDS: DTableField<Company>[] = ['name', 'users_count', 'vehicles_count', 'active', 'actions'];

export function getCompaniesTableFields(): GridColDef<Company[][number]>[] {
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

  return dataColumns.filter((col) => VISIBLE_FIELDS.includes(col.field as DTableField<Company>));
}
