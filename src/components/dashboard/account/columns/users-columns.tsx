import React from 'react';
import { formatPhoneNumber } from '@/utils/format';
import { Box, Typography } from '@mui/material';
import { GridRenderCellParams, type GridColDef } from '@mui/x-data-grid';

import { type DTableField } from '@/types/tables';
import { Profile, User } from '@/types/user';
import { logger } from '@/lib/default-logger';

// const VISIBLE_USER_FIELDS: readonly DTableField<User>[] = ['name', 'email', 'phone', 'role', 'profile', 'actions'];

export function getUserTableFields(): GridColDef<User>[] {
  const userColumns: GridColDef<User>[] = [
    { field: 'name', headerName: 'User Name', width: 200, editable: false, sortable: true, type: 'string' },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
      editable: false,
      sortable: true,
      type: 'string',
    },
    {
      field: 'phone_number',
      headerName: 'Phone',
      width: 200,
      editable: false,
      sortable: true,
      type: 'string',
      valueGetter: (_, row) => {
        return formatPhoneNumber(row.phone_number);
      },
      renderCell: ({ value, row }: GridRenderCellParams<User, User['phone_number']>) => (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <Typography variant="subtitle2">{value ?? 'None'}</Typography>
        </Box>
      ),
    },
    { field: 'role', headerName: 'Role', width: 200, editable: false, sortable: true, type: 'string' },
    {
      field: 'profile.country',
      headerName: 'Country',
      width: 200,
      editable: false,
      sortable: true,
      type: 'string',
      align: 'left',
      valueGetter: (_, row) => {
        return row.profile?.country ?? 'Not Registered';
      },
      renderCell: ({ value, row }: GridRenderCellParams<User, Profile['country']>) => (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <Typography variant="subtitle2" color={value ? 'secondary' : 'warning'}>
            {value}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'profile.city',
      headerName: 'City',
      width: 200,
      editable: false,
      sortable: true,
      type: 'string',
      align: 'left',
      valueGetter: (_, row) => {
        return row.profile?.city ?? 'Not Registered';
      },
      renderCell: ({ value, row }: GridRenderCellParams<User, Profile['city']>) => (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <Typography variant="subtitle2" color={value ? 'secondary' : 'warning'}>
            {value}
          </Typography>
        </Box>
      ),
    },
  ];

  // return userColumns.filter((col) => VISIBLE_USER_FIELDS.includes(col.field as DTableField<User>));
  return userColumns;
}
