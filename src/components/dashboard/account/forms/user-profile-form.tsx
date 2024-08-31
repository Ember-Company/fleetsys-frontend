import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Controller } from 'react-hook-form';

import { MultiFormProps } from '@/types/forms';
import { FormGrid } from '@/components/shared/form';

import { ProfileValues, SubmitValues } from './schemas';

export function ProfileFormContent({
  control,
  formData,
  updateFormState,
}: MultiFormProps<ProfileValues, SubmitValues>): React.JSX.Element {
  return (
    <form>
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
      </FormGrid>
    </form>
  );
}
