import { useCallback, useEffect } from 'react';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Controller } from 'react-hook-form';

import { MultiFormProps } from '@/types/forms';
import { logger } from '@/lib/default-logger';
import { FormGrid, MultiStepActions } from '@/components/shared/form';

import { ProfileValues, SubmitValues } from './schemas';

export function ProfileFormContent({
  control,
  formData,
  updateFormState,
  handleBack,
  handleSubmit,
}: MultiFormProps<ProfileValues, SubmitValues>): React.JSX.Element {
  const handleSubmitProfile = useCallback(
    async (values: ProfileValues) => {
      updateFormState(values);
    },
    [updateFormState]
  );

  return (
    <form onSubmit={handleSubmit(handleSubmitProfile)}>
      <FormGrid title="Profile Details">
        <Grid size={6}>
          <Controller
            control={control}
            name="user_meta.industry"
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>Industry</InputLabel>
                <OutlinedInput {...field} label="Industry" type="text" />
              </FormControl>
            )}
          />
        </Grid>
        <Grid size={6}>
          <Controller
            control={control}
            name="user_meta.country"
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>Country</InputLabel>
                <OutlinedInput {...field} label="Country" type="text" />
              </FormControl>
            )}
          />
        </Grid>
        <Grid size={6}>
          <Controller
            control={control}
            name="user_meta.region"
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>Region</InputLabel>
                <OutlinedInput {...field} label="Region" type="text" />
              </FormControl>
            )}
          />
        </Grid>
        <Grid size={6}>
          <Controller
            control={control}
            name="user_meta.city"
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>City</InputLabel>
                <OutlinedInput {...field} label="City" type="text" />
              </FormControl>
            )}
          />
        </Grid>
        <Grid size={12}>
          <MultiStepActions activeStep={1} handleBack={handleBack} />
        </Grid>
      </FormGrid>
    </form>
  );
}
