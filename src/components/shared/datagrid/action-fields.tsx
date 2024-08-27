import React from 'react';
import { GridActionsCellItem, type GridColDef, type GridValidRowModel } from '@mui/x-data-grid';
import { Trash } from '@phosphor-icons/react';

import { type DTableActionHandler } from '@/types/tables';

type ColDefRow<T> = GridColDef<T & { id: string }>;

interface TableActionHandler<T extends GridValidRowModel> {
  delete: (handler: DTableActionHandler) => ColDefRow<T>;
  edit: (handler: DTableActionHandler) => ColDefRow<T>;
}

class TableActionSelecter<T extends GridValidRowModel> implements TableActionHandler<T> {
  delete({ name, handler }: DTableActionHandler): ColDefRow<T> {
    return {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id, row }) => {
        return [
          <GridActionsCellItem
            icon={<Trash fill="var(--NavItem-icon-active-color)" fontSize="2rem" weight="fill" />}
            title="Delete"
            key={id}
            role="button"
            name={name}
            label="Delete"
            onClick={(_) => {
              handler(row.id);
            }}
            color="inherit"
            size="large"
            sx={{
              fontSize: '2rem',
            }}
          />,
        ];
      },
    };
  }

  edit() {
    return {};
  }
}

export default TableActionSelecter;
