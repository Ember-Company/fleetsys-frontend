import React, { useCallback } from 'react';
import { FormControl, Input, InputLabel } from '@mui/material';
import { Grid } from '@mui/system';
import { Control, Controller, useFormContext } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';

import { MultiFormPropsContext } from '@/types/forms';
import { logger } from '@/lib/default-logger';
import { useCreateCompany } from '@/hooks/queries';
import useAlertMessage from '@/hooks/use-alert-message';
import { FormGrid, MultiStepActions } from '@/components/shared/form';

import { CompanySchemaValues } from './schemas';

export default function CompanySubmit({
  formData,
  handleBack,
  handleNext,
  updateFormState,
  submitHandlers,
}: MultiFormPropsContext<CompanySchemaValues>): React.JSX.Element {
  const { mutate, isPending: isLoading } = useCreateCompany();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useFormContext<CompanySchemaValues>();
  const { AlertMessage, updateAlertMessage } = useAlertMessage();

  const renderFields = (
    data: CompanySchemaValues = formData,
    parentKey: string | undefined = undefined
  ): React.ReactNode[] => {
    return Object.keys(data).map((key) => {
      const value = formData[key as keyof CompanySchemaValues];

      return (
        <>
          <Field name={key} control={control} value={value as any} cellNumberFormat={key === 'contact_phone'} />
        </>
      );
    });
  };

  const handleCompanyCreation = useCallback(() => {
    mutate(formData, {
      onSuccess: () => {
        updateAlertMessage({
          text: 'Company Created Successfully',
          isError: false,
        });

        setTimeout(() => {
          handleNext();
        }, 2000);
      },
      onError: (err) => {
        updateAlertMessage({
          text: 'failed to create company',
          isError: true,
        });
      },
    });
  }, [logger, handleNext, formData, mutate]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleCompanyCreation();
      }}
    >
      <FormGrid title="Review Company Details" fullWidth fullWidthPadding={10}>
        {renderFields()}
        <Grid size={12}>
          <AlertMessage />
        </Grid>
        {submitHandlers(true, isSubmitting || isLoading)}
      </FormGrid>
    </form>
  );
}

const translateBool = (value: boolean) => {
  return value ? 'Yes' : 'No';
};

function Field({
  control,
  name,
  value,
  cellNumberFormat = false,
}: {
  control: Control<CompanySchemaValues>;
  name: string;
  value: string;
  cellNumberFormat?: boolean;
}): React.JSX.Element {
  return (
    <Grid size={4} key={name}>
      <Controller
        control={control}
        name={name as keyof CompanySchemaValues}
        // defaultValue={typeof value === 'boolean' ? translateBool(value) : value}
        disabled={!Boolean(value)}
        render={({ field }) => (
          <FormControl fullWidth>
            <InputLabel sx={{ textTransform: 'capitalize' }}>
              {name.split('.')[1] ?? name.split('_').join(' ') ?? name}
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
                value={typeof value === 'boolean' ? translateBool(value) : value}
                // value={value}
              />
            )}
          </FormControl>
        )}
      />
    </Grid>
  );
}
