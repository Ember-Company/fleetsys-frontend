'use client';

import React, { useMemo } from 'react';
import { DataGrid, GridActionsCellItem, GridRowId, GridSlots, GridToolbar, type GridColDef } from '@mui/x-data-grid';
import { Trash } from '@phosphor-icons/react';

import type { Company } from '@/types/company';
import { logger } from '@/lib/default-logger';
import { useGetCompanies } from '@/hooks/queries';
import ToolBar from '@/components/shared/datagrid/tool-bar';

const VISIBLE_FIELDS = ['name', 'users_count', 'vehicles_count', 'active', 'actions'];

export default function CompanyList(): React.JSX.Element {
  const { data, isLoading } = useGetCompanies();
  const dataColumns: GridColDef<Company[][number]>[] = [
    { field: 'name', headerName: 'Name', width: 200, editable: false, sortable: true, type: 'string' },
    {
      field: 'users_count',
      headerName: 'Employee Amount',
      width: 200,
      editable: false,
      sortable: true,
      type: 'number',
      align: 'left',
      headerAlign: 'left',
    },
    {
      field: 'vehicles_count',
      headerName: 'Vehicle Amount',
      width: 200,
      editable: false,
      sortable: true,
      type: 'number',
      align: 'left',
      headerAlign: 'left',
    },
    {
      field: 'active',
      headerName: 'Active Status',
      width: 200,
      editable: true,
      sortable: true,
      type: 'boolean',
      align: 'left',
      headerAlign: 'left',
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        // const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        return [
          <GridActionsCellItem
            icon={<Trash fill="var(--NavItem-icon-active-color)" fontSize="2rem" weight="fill" />}
            key={id}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
            size="large"
            sx={{
              fontSize: '2rem',
            }}
          />,
        ];
      },
    },
  ];

  const handleDeleteClick = (id: GridRowId) => () => {
    // setRows(rows.filter((row) => row.id !== id));
    logger.warn(id);
  };

  const columns = useMemo(() => {
    return dataColumns.filter((col) => VISIBLE_FIELDS.includes(col.field));
  }, []);

  return (
    <DataGrid
      columns={columns}
      rows={data}
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
          showQuickFilter: true,
        },
      }}
      slots={{
        toolbar: ToolBar as GridSlots['toolbar'],
      }}
    />
  );
}
