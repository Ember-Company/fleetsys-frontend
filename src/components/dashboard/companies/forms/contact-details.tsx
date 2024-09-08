import React from 'react';
import { FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Controller, useFormContext } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';

import { MultiFormPropsContext } from '@/types/forms';
import { FormGrid } from '@/components/shared/form';

import { CompanySchemaValues } from './schemas';

type Props = {};

export default function ContactDetails({
  formData,
  updateFormState,
  submitHandlers,
}: MultiFormPropsContext<CompanySchemaValues>): React.JSX.Element {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useFormContext<CompanySchemaValues>();

  return (
    <form onSubmit={handleSubmit(updateFormState)}>
      <FormGrid title="Contact Details" fullWidth fullWidthPadding={10}>
        <Grid size={12}>
          <Controller
            control={control}
            name="contact_name"
            defaultValue={formData.contact_name}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel size="small">Contact Name</InputLabel>
                <OutlinedInput label="Contact Name" type="text" {...field} size="small" />
                <FormHelperText>{errors?.contact_name?.message ?? null}</FormHelperText>
              </FormControl>
            )}
          />
        </Grid>

        <Grid size={12}>
          <Controller
            control={control}
            name="contact_email"
            defaultValue={formData.contact_email}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel size="small">Contact Email</InputLabel>
                <OutlinedInput {...field} label="Contact Email" type="email" size="small" />
                <FormHelperText>{errors?.contact_email?.message ?? null}</FormHelperText>
              </FormControl>
            )}
          />
        </Grid>

        <Grid size={12}>
          <Controller
            control={control}
            name="contact_phone"
            defaultValue={formData.contact_phone}
            rules={{
              required: false,
              validate: (value?: string) => {
                if (!value) return true;

                const cleanedValue = value.replace(/\D/g, '');
                return cleanedValue.length <= 15 || 'Phone number cannot have more than 15 digits';
              },
            }}
            render={({ field: { ref, onChange, onBlur, value, name } }) => (
              <FormControl fullWidth>
                <InputLabel size="small">Phone (Optional)</InputLabel>
                <PatternFormat
                  customInput={OutlinedInput}
                  size="small"
                  format="+### (##) ####-####"
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  name={name}
                  getInputRef={ref}
                  label="Phone (Optional)"
                  mask="_"
                  isAllowed={(values) => !Number.isInteger(values.value)}
                  allowEmptyFormatting
                />
                <FormHelperText>{errors?.contact_phone?.message ?? null}</FormHelperText>
              </FormControl>
            )}
          />
        </Grid>

        {submitHandlers()}
      </FormGrid>
    </form>
  );
}
