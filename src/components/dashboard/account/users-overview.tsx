'use client';

import React, { useEffect } from 'react';
import { DataGrid, GridSlots } from '@mui/x-data-grid';

import { User } from '@/types/user';
import { logger } from '@/lib/default-logger';
import { useGetUsers } from '@/hooks/queries';
import { useActionFields, useColumnVisibility } from '@/hooks/tables';
import { ToolBar } from '@/components/shared/datagrid/tool-bar';

import { getUserTableFields } from './columns';
import { DeleteAction } from './columns/action-columns';

export function UsersOverviewTable(): React.JSX.Element {
  const { data, isLoading } = useGetUsers();
  const { columnVisibilityModel, handleColumnVisibilityChange } = useColumnVisibility('users-column-model-key');

  const actionCols = useActionFields<User>([
    {
      name: 'delete',
      component: DeleteAction,
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
      onCellClick={(_, event) => event.stopPropagation}
      columnVisibilityModel={columnVisibilityModel}
      onColumnVisibilityModelChange={handleColumnVisibilityChange}
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
