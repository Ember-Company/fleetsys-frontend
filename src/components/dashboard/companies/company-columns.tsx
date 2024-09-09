import React from 'react';
import { type GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { type Company } from '@/types/company';

dayjs.extend(relativeTime);

export function getCompaniesTableFields(): GridColDef<Company[][number]>[] {
  const dataColumns: GridColDef<Company[][number]>[] = [
    { field: 'name', headerName: 'Name', width: 250, editable: false, sortable: true, type: 'string' },

    {
      field: 'users_count',
      headerName: 'Employees',
      width: 120,
      editable: false,
      sortable: true,
      type: 'number',
      align: 'left',
      headerAlign: 'left',
    },
    {
      field: 'vehicles_count',
      headerName: 'Vehicles',
      width: 120,
      editable: false,
      sortable: true,
      type: 'number',
      align: 'left',
      headerAlign: 'left',
      valueGetter: (_, row) => {
        return `${row.vehicles_count} / ${row.max_vehicles}`;
      },
    },
    {
      field: 'active',
      headerName: 'Active',
      width: 100,
      editable: true,
      sortable: true,
      type: 'boolean',
      align: 'left',
      headerAlign: 'left',
    },
    {
      field: 'last_active_at',
      headerName: 'Recent Activity',
      width: 150,
      editable: false,
      sortable: true,
      type: 'string',
      align: 'left',
      headerAlign: 'left',
      valueGetter: (_, row) => {
        if (!row.last_active_at) return 'No Usage';

        return dayjs(row.last_active_at).fromNow();
      },
    },
    {
      field: 'industry',
      headerName: 'Industry',
      width: 150,
      editable: false,
      sortable: true,
      type: 'string',
      valueGetter: (_, row) => {
        return row.industry ?? 'None';
      },
    },
    {
      field: 'country',
      headerName: 'Country',
      width: 150,
      editable: false,
      sortable: true,
      type: 'string',
      valueGetter: (_, row) => {
        return row.country ?? 'None';
      },
    },
    {
      field: 'city',
      headerName: 'City',
      width: 150,
      editable: false,
      sortable: true,
      type: 'string',
      valueGetter: (_, row) => {
        return row.city ?? 'None';
      },
    },
  ];

  return dataColumns;
  // return dataColumns.filter((col) => VISIBLE_FIELDS.includes(col.field as DTableField<Company>));
}
