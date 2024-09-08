'use client';

import React, { useCallback, useTransition } from 'react';
import { formatPhoneNumber } from '@/utils/format';
import { FormControl, Input, InputLabel } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Control, Controller, useFormContext } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';

import { MultiFormProps, MultiFormPropsContext } from '@/types/forms';
import { logger } from '@/lib/default-logger';
import { useRegisterQuery } from '@/hooks/queries';
import useAlertMessage from '@/hooks/use-alert-message';
import { FormGrid, MultiStepActions } from '@/components/shared/form';

import { AccountValues } from './schemas';

export function SubmitFormContent({
  formData,
  submitHandlers,
  handleNext,
}: MultiFormPropsContext<AccountValues>): React.JSX.Element {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useFormContext<AccountValues>();

  const { mutate, isPending: isLoading } = useRegisterQuery();
  const { AlertMessage, updateAlertMessage } = useAlertMessage();

  const renderFields = (
    data: AccountValues['user_meta'] | AccountValues = formData,
    parentKey: string | undefined = undefined
  ): React.ReactNode[] => {
    return Object.keys(data).map((key) => {
      const previousKey = parentKey as keyof AccountValues['user_meta'];
      const fieldName = parentKey ? `${previousKey}.${key}` : key;

      const value =
        parentKey && fieldName
          ? formData[previousKey][key as keyof AccountValues['user_meta']]
          : formData[key as keyof AccountValues];

      if (typeof value === 'object' && value !== null) {
        return renderFields(value, fieldName);
      }

      if (fieldName === 'phone_number') {
        logger.debug(value);
      }

      return (
        <>
          <Field
            name={fieldName}
            control={control}
            value={value ?? ''}
            cellNumberFormat={fieldName === 'phone_number'}
          />
        </>
      );
    });
  };

  const handleUserCreation = useCallback(() => {
    logger.debug(formData);

    mutate(formData, {
      onSuccess: () => {
        updateAlertMessage({
          text: 'User Created Successfully',
          isError: false,
        });

        setTimeout(() => {
          handleNext();
        }, 2000);
      },
      onError: (err) => {
        logger.error(err);

        updateAlertMessage({
          text: 'failed to create user',
          isError: true,
        });
      },
    });
  }, [logger, handleNext, formData, mutate]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleUserCreation();
      }}
    >
      <FormGrid title="Finalize Creation">
        {renderFields()}
        <Grid size={12}>
          <AlertMessage />
        </Grid>

        {submitHandlers(true, isLoading)}
      </FormGrid>
    </form>
  );
}

function Field({
  control,
  name,
  value,
  cellNumberFormat = false,
}: {
  control: Control<AccountValues>;
  name: string;
  value: string;
  cellNumberFormat?: boolean;
}): React.JSX.Element {
  return (
    <Grid size={4} key={name}>
      <Controller
        control={control}
        name={name as keyof AccountValues}
        defaultValue={value}
        disabled={!Boolean(value)}
        render={({ field }) => (
          <FormControl fullWidth>
            <InputLabel sx={{ textTransform: 'capitalize' }}>
              {name.split('.')[1] ?? name.split('_')[0] ?? name}
            </InputLabel>
            {cellNumberFormat ? (
              <PatternFormat
                customInput={Input}
                format={Boolean(value) ? '+### (##) ####-####' : ''}
                value={value}
                name={field.name}
                getInputRef={field.ref}
                disabled={value === ''}
                readOnly
                mask={!Boolean(value) ? undefined : '_'}
                sx={{
                  paddingLeft: 1.5,
                }}
                allowEmptyFormatting
              />
            ) : (
              <Input
                {...field}
                type={name === 'email' ? 'email' : name === 'password' ? 'password' : 'text'}
                readOnly
                sx={{ paddingLeft: 1.5 }}
                value={value}
              />
            )}
          </FormControl>
        )}
      />
    </Grid>
  );
}
