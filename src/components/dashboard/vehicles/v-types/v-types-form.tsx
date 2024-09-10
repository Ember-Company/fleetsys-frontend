import React, { useCallback, useEffect, useMemo, type PropsWithChildren } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Alert,
  Autocomplete,
  Button,
  CircularProgress,
  createFilterOptions,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Controller, ControllerRenderProps, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import {
  type CreateFormProps,
  type EditFormProps,
  type FormContentProps,
  type FormVariantTitle,
  type RootFormProps,
} from '@/types/forms';
import { logger } from '@/lib/default-logger';
import { useCreateVehicleType, useGetTargetVehicleType, useUpdateVehicleType } from '@/hooks/queries';
import { useGetAttributes } from '@/hooks/queries/attributes';
import useAlertMessage from '@/hooks/use-alert-message';

const schema = zod.object({
  name: zod.string().min(1, { message: 'Type Name is required' }),
  attributes: zod.array(zod.string()).max(3, 'Max 3 Items').optional(),
});

type Values = zod.infer<typeof schema>;
const defaultValues = { name: '', attributes: [] } satisfies Values;

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
        const { name, attributes } = data;

        formHandlers.setValue('name', name);
        formHandlers.setValue(
          'attributes',
          attributes.flatMap((attr) => attr.name)
        );
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
          {isPending ? 'Loading...' : 'Edit'}
        </Button>
      </Stack>
    </form>
  );
}

function Create({
  children,
  defaultValues,
  submitHandler,
}: CreateFormProps<Values> & PropsWithChildren): React.JSX.Element {
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
          {isPending ? 'Loading...' : 'Create'}
        </Button>
      </Stack>
    </form>
  );
}

const filter = createFilterOptions<string>();

function AttributeSelect({ value, onChange, ...rest }: ControllerRenderProps): React.JSX.Element {
  const { data = [], isLoading } = useGetAttributes();

  const existingAttributes = useMemo((): string[] => {
    return data.flatMap((item) => item.name);
  }, [data]);

  return (
    <Autocomplete
      multiple
      value={value}
      onChange={(event, newValue) => {
        if (newValue.length <= 3) {
          onChange(newValue);
        }
      }}
      {...rest}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        const isExisting = options.some((option) => inputValue === option);
        if (inputValue !== '' && !isExisting) {
          filtered.push(inputValue);
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="attribute-select"
      loading={isLoading}
      options={existingAttributes}
      getOptionLabel={(option) => {
        if (typeof option === 'string') {
          return option;
        }
        if (option) {
          return option;
        }
        return option;
      }}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <li key={key} {...optionProps}>
            {option}
          </li>
        );
      }}
      freeSolo
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select Attributes (Max 3)"
          fullWidth
          slotProps={{
            input: {
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            },
          }}
        />
      )}
    />
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
            <InputLabel>Name</InputLabel>
            <OutlinedInput {...field} label="Name" type="text" />
            <FormHelperText>{errors?.name?.message ?? null}</FormHelperText>
          </FormControl>
        )}
      />
      <Controller
        control={control}
        name="attributes"
        render={({ field, fieldState: { error } }) => (
          <FormControl error={Boolean(errors.attributes)}>
            <AttributeSelect {...field} />
            <FormHelperText>{errors?.attributes?.message ?? null}</FormHelperText>
          </FormControl>
        )}
      />
      {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
    </>
  );
}
