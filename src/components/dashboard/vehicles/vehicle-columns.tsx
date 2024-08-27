import React from 'react';
import { type GridColDef } from '@mui/x-data-grid';

import { type DTableField } from '@/types/tables';
import { type Vehicle } from '@/types/vehicles';

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
      field: 'vehicle_type.name',
      headerName: 'Type',
      width: 100,
      editable: false,
      sortable: true,
      type: 'number',
      align: 'left',
      headerAlign: 'left',
    },
    {
      field: 'vehicle_status.name',
      headerName: 'Status',
      width: 150,
      editable: false,
      sortable: true,
      type: 'string',
      renderCell: (params) => <span style={{ color: params.row.vehicle_status.status_color }}>{params.value}</span>,
    },
  ];

  return vehicleColumns.filter((col) => VISIBLE_VEHICLE_FIELDS.includes(col.field as DTableField<Vehicle>));
}
