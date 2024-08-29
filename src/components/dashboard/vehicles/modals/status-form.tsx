/* eslint-disable camelcase */
import React, { type PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, type AlertProps, Button, Chip, CircularProgress, FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput, Select, Stack, Typography } from '@mui/material';
import { Controller, useForm, type UseFormHandleSubmit, type UseFormReturn, type UseFormReturn } from 'react-hook-form';
import { z as zod } from 'zod';

import { useCreateVehicleStatus, useEditVehicleStatus, useGetTargetVehicleStatus, useGetVehicleStatuses } from '@/hooks/queries/v-status';
import { zodResolver } from '@hookform/resolvers/zod';
import { type VehicleStatus } from '@/types/vehicles';
import { logger } from '@/lib/default-logger';

type FormVariant = 'create' | 'edit';

interface StatusFormProps {
  variant: FormVariant;
  targetId?: string;
}

interface EditStatusProps {
  targetId?: string;
  defaultValues: Values;
  submitHandler: UseFormHandleSubmit<Values>
}

interface CreateStatusProps extends Omit<EditStatusProps, 'targetId'> {};

const schema = zod.object({
  name: zod.string().min(1, { message: 'Status Name is required' }),
  status_color: zod.string().optional(),
});

type Values = zod.infer<typeof schema>;

export default function StatusForm({ variant, targetId }: StatusFormProps): React.JSX.Element {
  const { data, isLoading } = useGetTargetVehicleStatus(targetId); // only enabled if targetId exists, enables edit mode
  const [defaultValues, setDefaultValues] = useState<Values>({ name: '', status_color: 'default' });

  const formHeader: Record<FormVariant, string> = {
    create: 'Create Status',
    edit: 'Edit Status'
  };

  const isEdit = useCallback((): boolean => {
    return variant === 'edit';
  }, [variant])

  useEffect(() => {
    if (isEdit()){
      if (!isLoading && data) {
        const { name, status_color } = data;
        setDefaultValues({
          name,
          status_color
        })
      }
    }
  }, [data, isEdit, isLoading])

  const {handleSubmit, ...formHandlers} = useForm<Values>({ defaultValues, resolver: zodResolver(schema) })

  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h5">{formHeader[variant]}</Typography>
      </Stack>

      {isEdit() ? (
        <Edit targetId={targetId} defaultValues={defaultValues}  submitHandler={handleSubmit}>
          <Stack>
              {isLoading ? (
                <CircularProgress />
              ) : (
                <FormContent {...formHandlers} />
              )}
          </Stack>

        </Edit>
      ) : (
        <Create defaultValues={defaultValues} submitHandler={handleSubmit}>
          <FormContent {...formHandlers} />
        </Create>
      )}
    </Stack>
  );
}

function Edit({targetId, children, submitHandler, defaultValues}: EditStatusProps & PropsWithChildren): React.JSX.Element {
  const [message, setMessage] = useState<{ text: string, statusColor: AlertProps['color'], isError: boolean }|null>(null);
  const { mutate, isPending } = useEditVehicleStatus(targetId)

  const handleEdit = useCallback(async (values: Values) => {
    mutate(values, {
      onSuccess: () => {
        setMessage({
          text: 'Status Modified Successfully',
          statusColor: 'success',
          isError: false
        });
      },
      onError: (err) => {
        logger.error(err);
        setMessage({
          text: err.message,
          statusColor:'error',
          isError: true
        });
      }
    });
  }, [mutate, setMessage]);

  if (!targetId) {
    return (
      <Alert variant='standard' color='error'>
        An error occurred, could not find resource
      </Alert>
    )
  }

 return (
  <form onSubmit={submitHandler(handleEdit)}>
    {children}

    {message ? <Alert color={message.statusColor} variant='filled'>{message.text}</Alert> : null}
    <Button disabled={isPending} type="submit" variant="contained">
      {isPending ? 'Loading...' : 'Edit Status'}
    </Button>
  </form>
 )
}

function Create({ children, submitHandler, defaultValues }: CreateStatusProps & PropsWithChildren): React.JSX.Element {
  const [message, setMessage] = useState<{ text: string, statusColor: AlertProps['color'], isError: boolean }|null>(null);
  const { mutate, isPending } = useCreateVehicleStatus();

  const handleCreate = useCallback(async (values: Values) => {
    logger.debug(values);
    mutate(values, {
      onSuccess: () => {
        setMessage({
          text: 'Status Created Successfully',
          statusColor: 'success',
          isError: false
        });
      },
      onError: (err) => {
        logger.error(err);
        setMessage({
          text: err.message,
          statusColor:'error',
          isError: true
        });
      }
    });
  }, [mutate, setMessage]);

  return (
    <form onSubmit={submitHandler(handleCreate)}>
      <Stack direction='column' spacing={4}>
        {children}
        {message ? <Alert color={message.statusColor} variant='filled'>{message.text}</Alert> : null}
        <Button disabled={isPending} type="submit" variant="contained">
          {isPending ? 'Loading...' : 'Create Status'}
        </Button>
      </Stack>
    </form>
  )
}

function FormContent({ control,  setError, formState: { errors } }: Omit<UseFormReturn<Values>, 'handleSubmit'>): React.JSX.Element {
  const { data, isLoading } = useGetVehicleStatuses();

  const colors = useMemo((): VehicleStatus['status_color'][] => {
    if (isLoading || !data) return [];

    const reducedColors = data?.reduce((acc: VehicleStatus['status_color'][], item) => {
      acc.push(item.status_color);

      return acc;
    },[]);

    return Array.from(new Set(reducedColors));
  }, [data, isLoading]);

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
      render={({field}) => (
        <FormControl sx={{  minWidth: '100%' }} error={Boolean(errors.status_color)}>
        <Select
          {...field}
          inputProps={{ 'aria-label': 'Without label' }}

        >
          {isLoading  ? (
            <CircularProgress />
          ) : (
            colors.map((color) => (
              <MenuItem key={color} value={color}>
                {color}
              </MenuItem>
            ))
          )}
        </Select>
        <FormHelperText sx={{ p: 0, m: 0 }}>
          <Chip component='span' sx={{ mt: 1 }} label="Status Color" color={field.value as VehicleStatus['status_color']} size='medium' />
        </FormHelperText>
      </FormControl>
      )}
    />
    </>
  )
}
