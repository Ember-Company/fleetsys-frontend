import { type GridColDef, type GridValidRowModel } from '@mui/x-data-grid';

import { type DTableActionHandler } from '@/types/tables';
import { logger } from '@/lib/default-logger';
import TableActionSelecter from '@/components/shared/datagrid/action-fields';

export default function useActionFields<T extends GridValidRowModel>(actions: DTableActionHandler[]): GridColDef<T>[] {
  const actionSelecter = new TableActionSelecter<T>();

  const compiledActions = actions.reduce((colDefs: GridColDef<T>[], action) => {
    const actionObject = actionSelecter[action.name](action) as GridColDef<T>;

    colDefs.push(actionObject);
    return colDefs;
  }, []);

  logger.debug(compiledActions);
  return compiledActions;
}
