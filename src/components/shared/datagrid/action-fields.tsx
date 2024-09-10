import React from 'react';
import { type GridValidRowModel } from '@mui/x-data-grid';

import { type ColDefRow, type DTableActionHandler, type TableActionHandler } from '@/types/tables';

class TableActionSelecter<T extends GridValidRowModel> implements TableActionHandler<T> {
  // TODO update to only return the <GridActionsCellItem /> component instead of the whole field object like below
  delete({ name, component: Component }: DTableActionHandler<T>): ColDefRow<T> {
    return {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      editable: false,
      sortable: false,
      cellClassName: 'actions',
      disableColumnMenu: true,
      disableExport: true,
      getActions: ({ id, row }) => {
        return [<Component data={row} />];
      },
    };
  }

  edit() {
    return {};
  }
}

export default TableActionSelecter;
