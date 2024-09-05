import { type UseFormHandleSubmit, type UseFormReturn } from 'react-hook-form';

export type FormVariant = 'create' | 'edit';

export type FormVariantTitle = Record<FormVariant, string>;

export interface RootFormProps {
  variant: FormVariant;
  targetId?: string;
}

export interface CreateFormProps<T> {
  defaultValues?: string;
  submitHandler: UseFormHandleSubmit<T>;
}

export interface EditFormProps<T> extends CreateFormProps<T> {
  targetId?: string;
}

export type FormContentProps<T> = Omit<UseFormReturn<T>, 'handleSubmit'>;
export interface MultiFormProps<T extends FieldValues, S extends FieldValues = T> extends UseFormReturn<T> {
  formData: S;
  updateFormState: (data: Partial<S>) => void;
  handleBack: () => void;
  handleNext: () => void;
}
