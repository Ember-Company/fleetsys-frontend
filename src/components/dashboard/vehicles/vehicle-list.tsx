'use client';

import React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

import { useVehiclesIndex } from '@/hooks/queries/vehicles';

function VehicleDataTable(): React.JSX.Element {
  const { data: vehicleDataIndex } = useVehiclesIndex();

  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 46,
    maxColumns: 6,
    editable: true,
  });

  return (
    <DataGrid
      {...data}
      pageSizeOptions={[5, 10, 25, 50]}
      autoHeight
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 10,
            page: 0,
          },
        },
      }}
      slots={{
        toolbar: GridToolbar,
      }}
    />
  );
}

export default VehicleDataTable;
