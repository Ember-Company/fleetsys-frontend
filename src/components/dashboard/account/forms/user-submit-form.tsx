'use client';

import React, { useCallback, useMemo, useTransition } from 'react';
import { Box, Button, FormControl, Input, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Control, Controller } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';

import { MultiFormProps } from '@/types/forms';
import { logger } from '@/lib/default-logger';
import { useRegisterQuery } from '@/hooks/queries';
import useAlertMessage from '@/hooks/use-alert-message';
import { FormGrid, MultiStepActions } from '@/components/shared/form';

import { ProfileValues, SubmitValues } from './schemas';

const formatPhoneNumber = (phoneNumber: string): string => {
  // Remove any existing country code and non-digit characters
  const cleanNumber = phoneNumber.replace(/\D+/g, '');

  // Format the phone number as "+255 (##) ####-####"
  const formattedNumber = cleanNumber.replace(/^(\d{3})(\d{2})(\d{4})(\d{4})$/, '+255 ($2) $3-$4');

  return formattedNumber;
};

export function SubmitFormContent({
  control,
  formData,
  handleBack,
  handleSubmit,
  handleNext,
}: MultiFormProps<SubmitValues>): React.JSX.Element {
  const { mutate, isPending: isLoading } = useRegisterQuery();
  const [isPending, startTransition] = useTransition();
  const { AlertMessage, updateAlertMessage } = useAlertMessage();

  const renderFields = (
    data: SubmitValues['user_meta'] | SubmitValues = formData,
    parentKey: string | undefined = undefined
  ): React.ReactNode[] => {
    return Object.keys(data).map((key) => {
      const previousKey = parentKey as keyof SubmitValues['user_meta'];
      const fieldName = parentKey ? `${previousKey}.${key}` : key;

      const value =
        parentKey && fieldName
          ? formData[previousKey][key as keyof SubmitValues['user_meta']]
          : formData[key as keyof SubmitValues];

      if (typeof value === 'object' && value !== null) {
        return renderFields(value, fieldName);
      }
      return (
        <>
          <Field name={fieldName} control={control} value={value ?? ''} cellNumberFormat={fieldName === 'phone'} />
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
        }, 3000);
      },
      onError: (err) => {
        logger.error(err);

        updateAlertMessage({
          text: 'failed to create user',
          isError: true,
        });
      },
    });
    // });
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
        <Grid size={12}>
          {/* <Button type="submit">Submit</Button> */}
          <MultiStepActions activeStep={2} handleBack={handleBack} loading={isLoading} isEnd />
        </Grid>
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
  control: Control<SubmitValues>;
  name: string;
  value: string;
  cellNumberFormat?: boolean;
}): React.JSX.Element {
  return (
    <Grid size={4} key={name}>
      <Controller
        control={control}
        name={name as keyof SubmitValues}
        defaultValue={value}
        render={({ field }) => (
          <FormControl fullWidth>
            <InputLabel sx={{ textTransform: 'capitalize' }}>{name.split('.')[1] ?? name}</InputLabel>
            {cellNumberFormat ? (
              <PatternFormat
                customInput={Input}
                format="+255 (##) ####-####"
                value={formatPhoneNumber(value) || ''}
                name={field.name}
                getInputRef={field.ref}
                prefix="+255 "
                readOnly
                mask="_"
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
