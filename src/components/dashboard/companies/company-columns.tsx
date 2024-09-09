import React from 'react';
import { formatPhoneNumber } from '@/utils/format';
import { Chip } from '@mui/material';
import { GridRenderCellParams, type GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { type Company } from '@/types/company';

dayjs.extend(relativeTime);

export function getCompaniesTableFields(): GridColDef<Company[][number]>[] {
  const dataColumns: GridColDef<Company[][number]>[] = [
    { field: 'name', headerName: 'Name', width: 250, editable: true, sortable: true, type: 'string' },
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
      field: 'max_vehicles',
      headerName: 'Vehicles',
      width: 120,
      editable: true,
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
      editable: true,
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
      editable: true,
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
      editable: true,
      sortable: true,
      type: 'string',
      valueGetter: (_, row) => {
        return row.city ?? 'None';
      },
    },
    {
      field: 'subscription_type',
      headerName: 'Subscription',
      width: 150,
      editable: true,
      sortable: true,
      type: 'string',
      display: 'flex',
      renderCell: ({ value, row }: GridRenderCellParams<Company, Company['subscription_type']>) => (
        <Chip variant="outlined" color={value === 'Monthly' ? 'default' : 'secondary'} size="small" label={value} />
      ),
    },
    {
      field: 'contact_name',
      headerName: 'Contact Name',
      width: 150,
      editable: true,
      sortable: true,
      type: 'string',
      valueGetter: (_, row) => {
        return row.contact_name ?? 'None';
      },
    },
    {
      field: 'contact_phone',
      headerName: 'Contact Number',
      width: 200,
      editable: true,
      sortable: true,
      type: 'string',
      valueGetter: (_, row) => {
        return formatPhoneNumber(row.contact_phone) ?? 'None';
      },
    },
    {
      field: 'contact_email',
      headerName: 'Company Email',
      width: 200,
      editable: true,
      sortable: true,
      type: 'string',
      valueGetter: (_, row) => {
        return row.contact_email ?? 'None';
      },
    },
    {
      field: 'has_support_access',
      headerName: 'Tech Support',
      width: 150,
      editable: true,
      sortable: true,
      type: 'boolean',
    },
  ];

  return dataColumns;
  // return dataColumns.filter((col) => VISIBLE_FIELDS.includes(col.field as DTableField<Company>));
}
