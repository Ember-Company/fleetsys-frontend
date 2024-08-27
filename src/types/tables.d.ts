import { type MouseEvent } from 'react';
import type React from 'react';

// import { type GridColDef, type GridValidRowModel } from '@mui/x-data-grid';

export type MuiFieldExtras = 'actions';
export type DTableField<T> = keyof T | MuiFieldExtras;
export type DTableFieldActionName = 'delete' | 'edit';

export interface DTableActionHandler {
  name: DTableFieldActionName;
  handler: (id: string) => void;
}
