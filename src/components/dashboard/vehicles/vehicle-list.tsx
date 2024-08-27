'use client';

import React, { useCallback } from 'react';
import { Toolbar } from '@mui/material';
import { DataGrid, type GridSlots } from '@mui/x-data-grid';

import { type Vehicle } from '@/types/vehicles';
import { logger } from '@/lib/default-logger';
import { useVehiclesIndex } from '@/hooks/queries/vehicles';
import { useActionFields } from '@/hooks/tables';
import { ToolBar } from '@/components/shared/datagrid/tool-bar';

import { getVehiclesTableFields } from './vehicle-columns';

function VehicleDataTable(): React.JSX.Element {
  const { data: vehicleDataIndex, isLoading } = useVehiclesIndex();

  const handleDeleteClick = useCallback((id: string) => {
    logger.warn(id);
  }, []);

  const actionCols = useActionFields<Vehicle>([
    {
      name: 'delete',
      handler: handleDeleteClick,
    },
  ]);

  return (
    <DataGrid
      columns={[...getVehiclesTableFields(), ...actionCols]}
      rows={vehicleDataIndex}
      loading={isLoading}
      pageSizeOptions={[5, 10, 25, 50]}
      autoHeight
      disableColumnFilter
      checkboxSelection
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
          title: 'Vehicle',
        },
      }}
      slots={{
        toolbar: ToolBar as GridSlots['toolbar'],
        // toolbar: <ToolBar actionButtons={null} /> as GridSlots['toolbar']
        // toolbar: ToolbarWithButtons('add vehicle').toolbar as unknown as GridSlots['toolbar'],
      }}
    />
  );
}

export default VehicleDataTable;
