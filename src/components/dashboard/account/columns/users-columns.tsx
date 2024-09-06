import React from 'react';
import { Box, Typography } from '@mui/material';
import { GridRenderCellParams, type GridColDef } from '@mui/x-data-grid';

import { type DTableField } from '@/types/tables';
import { Profile, User } from '@/types/user';

const VISIBLE_USER_FIELDS: readonly DTableField<User>[] = ['name', 'email', 'phone', 'role', 'profile', 'actions'];

export function getUserTableFields(): GridColDef<User>[] {
  const userColumns: GridColDef<User>[] = [
    { field: 'name', headerName: 'User Name', width: 200, editable: false, sortable: true, type: 'string' },
    {
      field: 'email',
      headerName: 'Email',
      width: 150,
      editable: false,
      sortable: true,
      type: 'string',
    },
    { field: 'phone', headerName: 'Phone', width: 150, editable: false, sortable: true, type: 'string' },
    { field: 'role', headerName: 'Role', width: 150, editable: false, sortable: true, type: 'string' },
    {
      field: 'profile',
      headerName: 'Country',
      width: 150,
      editable: false,
      sortable: true,
      type: 'string',
      align: 'left',
      valueGetter: (_, row) => {
        return row.profile.country;
      },
      renderCell: ({ value, row }: GridRenderCellParams<User, Profile['country']>) => (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <Typography variant="subtitle2">{value ?? 'Not Registered'}</Typography>
        </Box>
      ),
    },
  ];

  return userColumns.filter((col) => VISIBLE_USER_FIELDS.includes(col.field as DTableField<User>));
}
