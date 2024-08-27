'use client';

import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DataGrid, type GridRowParams, type GridSlots } from '@mui/x-data-grid';

import { type Vehicle } from '@/types/vehicles';
import { paths } from '@/paths';
import { logger } from '@/lib/default-logger';
import { useVehiclesIndex } from '@/hooks/queries';
import { useActionFields } from '@/hooks/tables';
import { ToolBar } from '@/components/shared/datagrid/tool-bar';

import { getVehiclesTableFields } from './vehicle-columns';

function VehicleDataTable(): React.JSX.Element {
  const { data: vehicleDataIndex, isLoading } = useVehiclesIndex();
  const router = useRouter();

  const handleDeleteClick = useCallback((id: string) => {
    logger.warn(id);
  }, []);

  const showVehicleDetailsPage = (id: string): void => {
    router.push(paths.dashboard.vehicles + id);
  };

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
      disableRowSelectionOnClick
      onRowDoubleClick={({ row }: GridRowParams<Vehicle>) => {
        showVehicleDetailsPage(row.id);
      }}
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
      }}
    />
  );
}

export default VehicleDataTable;
