'use client';

import React, { useEffect } from 'react';
import { DataGrid, GridSlots } from '@mui/x-data-grid';

import { User } from '@/types/user';
import { logger } from '@/lib/default-logger';
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

  useEffect(() => {
    logger.debug(data);
  }, [data]);

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
