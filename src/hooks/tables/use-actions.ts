import { type GridColDef, type GridValidRowModel } from '@mui/x-data-grid';

import { type DTableActionHandler } from '@/types/tables';
import TableActionSelecter from '@/components/shared/datagrid/action-fields';

export default function useActionFields<T extends GridValidRowModel>(
  actions: DTableActionHandler<T>[]
): GridColDef<T>[] {
  const actionSelecter = new TableActionSelecter<T>();

  return actions.reduce((colDefs: GridColDef<T>[], action) => {
    const actionObject = actionSelecter[action.name](action) as GridColDef<T>;

    return [...colDefs, actionObject];
  }, []);
}
