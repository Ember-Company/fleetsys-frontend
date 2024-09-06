'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid2';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import { DataGrid, GridSlots } from '@mui/x-data-grid';

import { User } from '@/types/user';
import { useGetUsers } from '@/hooks/queries';
import { useActionFields } from '@/hooks/tables';
import { ToolBar } from '@/components/shared/datagrid/tool-bar';

import { getUserTableFields } from './columns';

export function AccountDetailsForm(): React.JSX.Element {
  const { data, isLoading } = useGetUsers();
  const actionCols = useActionFields<User>([
    {
      name: 'delete',
      handler: () => 'hello',
    },
  ]);

  return (
    <DataGrid
      columns={[...getUserTableFields(), ...actionCols]}
      rows={data}
      loading={isLoading}
      pageSizeOptions={[5, 10, 25, 50]}
      autoHeight
      disableColumnFilter
      disableRowSelectionOnClick
      // onRowDoubleClick={({ row }: GridRowParams<User>) => {
      //   showVehicleDetailsPage(row.id);
      // }}
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
          title: 'Users',
        },
      }}
      slots={{
        toolbar: ToolBar as GridSlots['toolbar'],
      }}
    />
  );
}
