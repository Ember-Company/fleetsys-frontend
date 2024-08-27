import type React from 'react';
import { type GridColDef, type GridValidRowModel } from '@mui/x-data-grid';

// import { type GridColDef, type GridValidRowModel } from '@mui/x-data-grid';

export type MuiFieldExtras = 'actions';
export type DTableField<T> = keyof T | MuiFieldExtras;
export type DTableFieldActionName = 'delete' | 'edit';

export interface DTableActionHandler {
  name: DTableFieldActionName;
  handler: (id: string) => void;
}
export type ColDefRow<T> = GridColDef<T & { id: string }>;

export interface TableActionHandler<T extends GridValidRowModel> {
  delete: (handler: DTableActionHandler) => ColDefRow<T>;
  edit: (handler: DTableActionHandler) => ColDefRow<T>;
}
