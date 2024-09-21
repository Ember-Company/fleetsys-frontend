import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Controller, useFormContext } from 'react-hook-form';

import { MultiFormPropsContext } from '@/types/forms';
import { FormGrid } from '@/components/shared/form';
import ProfileFields from '@/components/shared/form/fields/profile-fields';

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
        <ProfileFields />

        {submitHandlers()}
      </FormGrid>
    </form>
  );
}
