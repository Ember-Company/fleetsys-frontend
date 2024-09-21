import { OutlinedInputProps } from '@mui/material';

export interface FieldComponentProps<S> {
  fieldSize?: OutlinedInputProps['size'];
  disableFields?: Partial<Record<keyof S, boolean>>;
  hideFields?: Partial<Record<keyof S, boolean>>;
}
