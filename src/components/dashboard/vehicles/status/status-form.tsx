/* eslint-disable camelcase */
import React, { type PropsWithChildren, useCallback, useEffect,  useState } from 'react';
import { Alert, type AlertProps, Button, Chip, CircularProgress, FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput, Select, Stack, Typography } from '@mui/material';
import { Controller, useForm, type UseFormHandleSubmit, type UseFormReturn, type UseFormReturn } from 'react-hook-form';
import { z as zod } from 'zod';

import { useCreateVehicleStatus, useEditVehicleStatus, useGetTargetVehicleStatus } from '@/hooks/queries/v-status';
import { zodResolver } from '@hookform/resolvers/zod';
import { type StatusColors } from '@/types/vehicles';
import { logger } from '@/lib/default-logger';
import useAlertMessage from '@/hooks/use-alert-message';

type FormVariant = 'create' | 'edit';

interface StatusFormProps {
  variant: FormVariant;
  targetId?: string;
}

interface EditStatusProps {
  targetId?: string;
  defaultValues?: Values;
  submitHandler: UseFormHandleSubmit<Values>
}

interface CreateStatusProps extends Omit<EditStatusProps, 'targetId'|'currentValues'> {};

const colors: StatusColors[] = ['default', 'error', 'info', 'success', 'warning', 'primary', 'secondary'];

const schema = zod.object({
  name: zod.string().min(1, { message: 'Status Name is required' }),
  status_color: zod.enum(['default', 'error', 'info', 'success', 'warning', 'primary', 'secondary'])
});

type Values = zod.infer<typeof schema>;
const defaultValues = { name: '', status_color: 'default' } satisfies Values;

export function StatusForm({ variant, targetId }: StatusFormProps): React.JSX.Element {
  const { data, isLoading } = useGetTargetVehicleStatus(targetId); // only enabled if targetId exists, enables edit mode
  const {handleSubmit, ...formHandlers} = useForm<Values>({ defaultValues, resolver: zodResolver(schema) })

  const formHeader: Record<FormVariant, string> = {
    create: 'Create Status',
    edit: 'Edit Status'
  };

  const isEdit = useCallback((): boolean => {
    return variant === 'edit';
  }, [variant])

  useEffect(() => {
    if (isEdit() && !isLoading){
      if (data) {
        const { name, status_color } = data;

        formHandlers.setValue('name', name);
        formHandlers.setValue('status_color', status_color);
      }
    }
  }, [data, formHandlers, isEdit, isLoading])


  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h5">{formHeader[variant]}</Typography>
      </Stack>

      {isEdit() ? (
        <Edit targetId={targetId} submitHandler={handleSubmit} >
          {isLoading ? (
            <CircularProgress />
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

function Edit({targetId, children, submitHandler}: EditStatusProps & PropsWithChildren): React.JSX.Element {
  const { AlertMessage, updateAlertMessage } = useAlertMessage();
  const { mutate, isPending } = useEditVehicleStatus(targetId);

  const handleEdit = useCallback(async (values: Values) => {
    mutate(values, {
      onSuccess: () => {
        updateAlertMessage({
          text: 'Status Modified Successfully',
          isError: false
        })
      },
      onError: (err) => {
        updateAlertMessage({
          text: err.message,
          isError: true
        })
      }
    });
  }, [mutate, updateAlertMessage]);

  if (!targetId) {
    return (
      <Alert variant='standard' color='error'>
        An error occurred, could not find resource
      </Alert>
    )
  }

 return (
  <form onSubmit={submitHandler(handleEdit)}>
    <Stack direction='column' spacing={4}>
      {children}

    {/* {message ? <Alert color={message.statusColor} variant='standard'>{message.text}</Alert> : null} */}
    <AlertMessage />
    <Button disabled={isPending} type="submit" variant="contained">
      {isPending ? 'Loading...' : 'Edit Status'}
    </Button>
    </Stack>
  </form>
 )
}

function Create({ children, submitHandler }: CreateStatusProps & PropsWithChildren): React.JSX.Element {
  const { AlertMessage, updateAlertMessage } = useAlertMessage();
  const { mutate, isPending } = useCreateVehicleStatus();


  const handleCreate = useCallback(async (values: Values) => {
    mutate(values, {
      onSuccess: () => {
        updateAlertMessage({
          text: 'Status Created Successfully',
          isError: false
        })
      },
      onError: (err) => {
        updateAlertMessage({
          text: err.message,
          isError: true
        })
      }
    });
  }, [mutate, updateAlertMessage]);

  return (
    <form onSubmit={submitHandler(handleCreate)}>
      <Stack direction='column' spacing={4}>
        {children}
        <AlertMessage />
        <Button disabled={isPending} type="submit" variant="contained">
          {isPending ? 'Loading...' : 'Create Status'}
        </Button>
      </Stack>
    </form>
  )
}

function FormContent({ control, formState: { errors } }: Omit<UseFormReturn<Values>, 'handleSubmit'>): React.JSX.Element {
  return (
    <>
      <Controller
      control={control}
      name="name"
      render={({ field }) => (
        <FormControl error={Boolean(errors.name)}>
          <InputLabel>Status Title</InputLabel>
          <OutlinedInput {...field} label="Status Title" type="text" />
          <FormHelperText>{errors?.name?.message ?? null}</FormHelperText>
        </FormControl>
      )}
    />
    <Controller
      control={control}
      name='status_color'
      defaultValue='default'
      rules={{
        min: 1
      }}
      render={({field}) => (
        <FormControl sx={{  minWidth: '100%' }} error={Boolean(errors.status_color)} >
        <Select
          {...field}
          inputProps={{ 'aria-label': 'Without label' }}
          sx={{
            textTransform: 'capitalize'
          }}
        >
          {colors.map((color) => (
            <MenuItem key={color} value={color} sx={{
            textTransform: 'capitalize'
          }}>
              {color}
            </MenuItem>
          ))}

        </Select>
        <FormHelperText sx={{ p: 0, m: 0 }}>
          <Chip component='span' sx={{ mt: 1 }} label="Status Color" color={field.value} size='medium' />
        </FormHelperText>
      </FormControl>
      )}
    />
    {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
    </>
  )
}
