import React from 'react';
import { FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Controller, useFormContext } from 'react-hook-form';

import { MultiFormPropsContext } from '@/types/forms';
import { FormGrid } from '@/components/shared/form';

import { CompanySchemaValues } from './schemas';

export default function CompanyDetails({
  formData,
  updateFormState,
  submitHandlers,
}: MultiFormPropsContext<CompanySchemaValues>): React.JSX.Element {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useFormContext<CompanySchemaValues>();

  return (
    <form onSubmit={handleSubmit(updateFormState)}>
      <FormGrid title="Company Details" fullWidth fullWidthPadding={10}>
        <Grid size={12}>
          <Controller
            control={control}
            name="name"
            rules={{ required: 'Name is Required' }}
            defaultValue={formData.name}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel size="small">Name</InputLabel>
                <OutlinedInput label="Name" type="text" {...field} size="small" />
                <FormHelperText>{errors?.name?.message ?? null}</FormHelperText>
              </FormControl>
            )}
          />
        </Grid>
        <Grid size={12}>
          <Controller
            control={control}
            name="industry"
            defaultValue={formData.industry}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel size="small">Industry (optional)</InputLabel>
                <OutlinedInput label="Industry (optional)" type="text" {...field} size="small" />
                <FormHelperText>{errors?.industry?.message ?? null}</FormHelperText>
              </FormControl>
            )}
          />
        </Grid>

        <Grid size={12}>
          <Controller
            control={control}
            name="country"
            defaultValue={formData.country}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel size="small">Country (optional)</InputLabel>
                <OutlinedInput label="Country (optional)" type="text" {...field} size="small" />
                <FormHelperText>{errors?.country?.message ?? null}</FormHelperText>
              </FormControl>
            )}
          />
        </Grid>

        <Grid size={12}>
          <Controller
            control={control}
            name="state"
            defaultValue={formData.state}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel size="small">State (optional)</InputLabel>
                <OutlinedInput label="State (optional)" type="text" {...field} size="small" />
                <FormHelperText>{errors?.state?.message ?? null}</FormHelperText>
              </FormControl>
            )}
          />
        </Grid>

        <Grid size={12}>
          <Controller
            control={control}
            name="city"
            defaultValue={formData.city}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel size="small">City (optional)</InputLabel>
                <OutlinedInput label="City (optional)" type="text" {...field} size="small" />
                <FormHelperText>{errors?.city?.message ?? null}</FormHelperText>
              </FormControl>
            )}
          />
        </Grid>

        {submitHandlers()}
      </FormGrid>
    </form>
  );
}
