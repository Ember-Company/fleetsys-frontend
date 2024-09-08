import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Controller, useFormContext } from 'react-hook-form';

import { MultiFormPropsContext } from '@/types/forms';
import { FormGrid } from '@/components/shared/form';

import { AccountValues } from './schemas';

export function ProfileFormContent({
  formData,
  updateFormState,
  handleBack,
  submitHandlers,
}: MultiFormPropsContext<AccountValues>): React.JSX.Element {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useFormContext<AccountValues>();

  return (
    <form onSubmit={handleSubmit(updateFormState)}>
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

        {submitHandlers()}
      </FormGrid>
    </form>
  );
}
