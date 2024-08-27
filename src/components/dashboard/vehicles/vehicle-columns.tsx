import React from 'react';
import { Chip } from '@mui/material';
import { type GridColDef, type GridRenderCellParams } from '@mui/x-data-grid';

import { type DTableField } from '@/types/tables';
import { type Vehicle, type VehicleStatus, type VehicleType } from '@/types/vehicles';

const VISIBLE_VEHICLE_FIELDS: readonly DTableField<Vehicle>[] = [
  'name',
  'license_plate',
  'make',
  'model',
  'year',
  'vehicle_status',
  'vehicle_type',
  'actions',
];

export function getVehiclesTableFields(): GridColDef<Vehicle>[] {
  const vehicleColumns: GridColDef<Vehicle>[] = [
    { field: 'name', headerName: 'Vehicle Name', width: 200, editable: false, sortable: true, type: 'string' },
    {
      field: 'license_plate',
      headerName: 'License Plate',
      width: 150,
      editable: false,
      sortable: true,
      type: 'string',
    },
    { field: 'make', headerName: 'Make', width: 150, editable: false, sortable: true, type: 'string' },
    { field: 'model', headerName: 'Model', width: 150, editable: false, sortable: true, type: 'string' },
    {
      field: 'year',
      headerName: 'Year',
      width: 100,
      editable: false,
      sortable: true,
      type: 'number',
      align: 'left',
      headerAlign: 'left',
    },
    {
      field: 'vehicle_type',
      headerName: 'Type',
      width: 100,
      editable: false,
      sortable: true,
      type: 'string',
      align: 'left',
      headerAlign: 'left',
      valueGetter: (_, row) => {
        return row.vehicle_type.name;
      },
      renderCell: ({ value }: GridRenderCellParams<Vehicle, VehicleType['name']>) => (
        <Chip variant="filled" size="medium" color="default" label={value} />
      ),
    },
    {
      field: 'vehicle_status',
      headerName: 'Status',
      width: 150,
      editable: false,
      sortable: true,
      type: 'string',
      valueGetter: (_, row) => {
        return row.vehicle_status.name;
      },
      renderCell: ({ value }: GridRenderCellParams<Vehicle, VehicleStatus['name']>) => (
        <Chip variant="filled" size="medium" color="error" label={value} />
      ),
    },
  ];

  return vehicleColumns.filter((col) => VISIBLE_VEHICLE_FIELDS.includes(col.field as DTableField<Vehicle>));
}
