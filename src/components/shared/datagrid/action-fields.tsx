import React from 'react';
import { GridActionsCellItem, type GridValidRowModel } from '@mui/x-data-grid';
import { Trash } from '@phosphor-icons/react';

import { type ColDefRow, type DTableActionHandler, type TableActionHandler } from '@/types/tables';

class TableActionSelecter<T extends GridValidRowModel> implements TableActionHandler<T> {
  // TODO update to only return the <GridActionsCellItem /> component instead of the whole field object like below
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
