import type React from 'react';
import { ComponentType } from 'react';
import { GridActionsCellItemProps, type GridColDef, type GridValidRowModel } from '@mui/x-data-grid';

// import { type GridColDef, type GridValidRowModel } from '@mui/x-data-grid';

export type MuiFieldExtras = 'actions';
export type DTableField<T> = keyof T | MuiFieldExtras;
export type DTableFieldActionName = 'delete' | 'edit';

export interface DTableActionHandler<T extends GridValidRowModel> {
  name: DTableFieldActionName;
  component: React.ComponentType<DActionComponent<T>>;
}

export interface DActionComponent<T extends GridValidRowModel> {
  // name: DTableFieldActionName;
  data: T;
  // target: string;
  props?: GridActionsCellItemProps;
}

export type ColDefRow<T> = GridColDef<T & { id: string }>;

export interface TableActionHandler<T extends GridValidRowModel> {
  delete: (handler: DTableActionHandler<T>) => ColDefRow<T>;
  edit: (handler: DTableActionHandler<T>) => ColDefRow<T>;
}
