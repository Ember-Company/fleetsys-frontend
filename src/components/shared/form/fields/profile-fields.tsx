import React from 'react';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import { Grid } from '@mui/system';
import { Controller, useFormContext } from 'react-hook-form';

import { AccountValues, EditAccountValues } from '@/components/dashboard/account/forms/schemas';

import { FieldComponentProps } from './types';

type Props = {};

export default function ProfileFields({ fieldSize }: FieldComponentProps) {
  const {
    control,
    formState: { errors },
    getValues,
  } = useFormContext<AccountValues | EditAccountValues>();
  const formData = getValues();
  const labelSize = fieldSize === 'small' ? fieldSize : 'normal';

  return (
    <>
      <Grid size={6}>
        <Controller
          control={control}
          defaultValue={formData.user_meta?.industry}
          name="user_meta.industry"
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel size={labelSize}>Industry</InputLabel>
              <OutlinedInput {...field} label="Industry" type="text" size={fieldSize} />
            </FormControl>
          )}
        />
      </Grid>
      <Grid size={6}>
        <Controller
          control={control}
          name="user_meta.country"
          defaultValue={formData.user_meta?.country}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel size={labelSize}>Country</InputLabel>
              <OutlinedInput {...field} label="Country" type="text" size={fieldSize} />
            </FormControl>
          )}
        />
      </Grid>
      <Grid size={6}>
        <Controller
          control={control}
          defaultValue={formData.user_meta?.region}
          name="user_meta.region"
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel size={labelSize}>Region</InputLabel>
              <OutlinedInput {...field} label="Region" type="text" size={fieldSize} />
            </FormControl>
          )}
        />
      </Grid>
      <Grid size={6}>
        <Controller
          control={control}
          defaultValue={formData.user_meta?.city}
          name="user_meta.city"
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel size={labelSize}>City</InputLabel>
              <OutlinedInput {...field} label="City" type="text" size={fieldSize} />
            </FormControl>
          )}
        />
      </Grid>
    </>
  );
}
