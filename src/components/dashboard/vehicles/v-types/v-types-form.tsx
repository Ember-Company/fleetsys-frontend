import React, { useCallback, useEffect, type PropsWithChildren } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Alert,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import {
  type CreateFormProps,
  type EditFormProps,
  type FormContentProps,
  type FormVariantTitle,
  type RootFormProps,
} from '@/types/forms';
import { useCreateVehicleType, useGetTargetVehicleType, useUpdateVehicleType } from '@/hooks/queries';
import useAlertMessage from '@/hooks/use-alert-message';

const schema = zod.object({
  name: zod.string().min(1, { message: 'Type Name is required' }),
});

type Values = zod.infer<typeof schema>;
const defaultValues = { name: '' } satisfies Values;

export function TypesForm({ variant, targetId }: RootFormProps): React.JSX.Element {
  const { data, isLoading } = useGetTargetVehicleType(targetId);

  const { handleSubmit, ...formHandlers } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const formHeader: FormVariantTitle = {
    create: 'Create Vehicle Type',
    edit: 'Edit Vehicle Type',
  };

  const isEdit = useCallback((): boolean => {
    return variant === 'edit';
  }, [variant]);

  useEffect(() => {
    if (isEdit() && !isLoading) {
      if (data) {
        const { name } = data;

        formHandlers.setValue('name', name);
      }
    }
  }, [data, formHandlers, isEdit, isLoading]);

  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h5">{formHeader[variant]}</Typography>
      </Stack>

      {isEdit() ? (
        <Edit targetId={targetId} submitHandler={handleSubmit}>
          {isLoading ? (
            <Stack alignItems="center" justifyContent="center">
              <CircularProgress />
            </Stack>
          ) : (
            <FormContent {...formHandlers} />
          )}
        </Edit>
      ) : (
        <Create submitHandler={handleSubmit}>
          <FormContent {...formHandlers} />
        </Create>
      )}
    </Stack>
  );
}

function Edit({ targetId, children, submitHandler }: EditFormProps<Values> & PropsWithChildren): React.JSX.Element {
  const { AlertMessage, updateAlertMessage } = useAlertMessage();
  const { mutate, isPending } = useUpdateVehicleType(targetId);

  const handleEdit = useCallback(
    async (values: Values) => {
      mutate(values, {
        onSuccess: () => {
          updateAlertMessage({
            text: 'Type Modified Successfully',
            isError: false,
          });
        },
        onError: (err) => {
          updateAlertMessage({
            text: err.message,
            isError: true,
          });
        },
      });
    },
    [mutate, updateAlertMessage]
  );

  if (!targetId) {
    return (
      <Alert variant="standard" color="error">
        An error occurred, could not find resource
      </Alert>
    );
  }

  return (
    <form onSubmit={submitHandler(handleEdit)}>
      <Stack direction="column" spacing={4}>
        {children}

        <AlertMessage />
        <Button disabled={isPending} type="submit" variant="contained">
          {isPending ? 'Loading...' : 'Edit Vehicle Type'}
        </Button>
      </Stack>
    </form>
  );
}

function Create({ children, submitHandler }: CreateFormProps<Values> & PropsWithChildren): React.JSX.Element {
  const { AlertMessage, updateAlertMessage } = useAlertMessage();
  const { mutate, isPending } = useCreateVehicleType();

  const handleCreate = useCallback(
    async (values: Values) => {
      mutate(values, {
        onSuccess: () => {
          updateAlertMessage({
            text: 'Status Created Successfully',
            isError: false,
          });
        },
        onError: (err) => {
          updateAlertMessage({
            text: err.message,
            isError: true,
          });
        },
      });
    },
    [mutate, updateAlertMessage]
  );

  return (
    <form onSubmit={submitHandler(handleCreate)}>
      <Stack direction="column" spacing={4}>
        {children}
        <AlertMessage />
        <Button disabled={isPending} type="submit" variant="contained">
          {isPending ? 'Loading...' : 'Create Status'}
        </Button>
      </Stack>
    </form>
  );
}

function FormContent({ control, formState: { errors } }: FormContentProps<Values>): React.JSX.Element {
  return (
    <>
      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <FormControl error={Boolean(errors.name)}>
            <InputLabel>Status Title</InputLabel>
            <OutlinedInput {...field} label="Vehicle Type Title" type="text" />
            <FormHelperText>{errors?.name?.message ?? null}</FormHelperText>
          </FormControl>
        )}
      />
      {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
    </>
  );
}
