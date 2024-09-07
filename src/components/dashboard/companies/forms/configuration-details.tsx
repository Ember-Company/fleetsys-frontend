import React, { useCallback } from 'react';
import { CheckCircle } from '@mui/icons-material';
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Input,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Switch,
  TextField,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Controller, useFormContext } from 'react-hook-form';

import { MultiFormPropsContext } from '@/types/forms';
import { logger } from '@/lib/default-logger';
import { FormGrid, MultiStepActions } from '@/components/shared/form';

import { roles } from '../../account/forms/schemas';
import { CompanySchemaValues, subscriptions } from './schemas';

function ConfigurationDetails({
  formData,
  handleBack,
  handleNext,
  updateFormState,
}: MultiFormPropsContext<CompanySchemaValues>) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useFormContext<CompanySchemaValues>();

  return (
    <form onSubmit={handleSubmit(updateFormState)}>
      <FormGrid title="Company Configuration" fullWidth fullWidthPadding={10}>
        <Grid size={12} container>
          <Grid size={4}>
            <Controller
              control={control}
              name="max_vehicles"
              defaultValue={formData.max_vehicles}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel size="small">Max Vehicles</InputLabel>
                  <OutlinedInput
                    label="Max Vehicles"
                    type="number"
                    {...field}
                    size="small"
                    value={field.value?.toString()}
                    onChange={(e) => field.onChange(parseInt(e.target.value) || '')}
                  />
                  <FormHelperText>{errors?.max_vehicles?.message ?? null}</FormHelperText>
                </FormControl>
              )}
            />
          </Grid>

          <Grid size={4}>
            <Controller
              control={control}
              name="max_drivers"
              defaultValue={formData.max_drivers}
              rules={{
                min: 1,
              }}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel size="small">Max Drivers</InputLabel>
                  <OutlinedInput
                    label="Max Drivers"
                    type="number"
                    {...field}
                    value={field.value?.toString()}
                    onChange={(e) => field.onChange(parseInt(e.target.value) || '')}
                    size="small"
                  />
                  <FormHelperText>{errors?.max_drivers?.message ?? null}</FormHelperText>
                </FormControl>
              )}
            />
          </Grid>

          <Grid size={4}>
            <Controller
              control={control}
              name="max_routes"
              defaultValue={formData.max_routes}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel size="small">Max Routes</InputLabel>
                  <OutlinedInput
                    label="Max Routes"
                    type="number"
                    {...field}
                    size="small"
                    value={field.value?.toString()}
                    onChange={(e) => field.onChange(parseInt(e.target.value) || '')}
                  />
                  <FormHelperText>{errors?.max_routes?.message ?? null}</FormHelperText>
                </FormControl>
              )}
            />
          </Grid>
        </Grid>

        <Grid size={12}>
          <FormControl component="fieldset" variant="standard" sx={{ display: 'flex', flexDirection: 'row' }}>
            <FormGroup sx={{ display: 'flex', flexDirection: 'column', rowGap: 1 }}>
              <Controller
                control={control}
                name="subscription_type"
                render={({ field }) => (
                  <Stack>
                    <FormLabel id="Subscription Type">Subscription Type</FormLabel>
                    <RadioGroup aria-labelledby="Subscription Selection" {...field} row>
                      {subscriptions.map((sub) => (
                        <FormControlLabel key={sub} value={sub} control={<Radio />} label={sub} />
                      ))}
                    </RadioGroup>
                  </Stack>
                )}
              />
              <Controller
                control={control}
                name="active"
                defaultValue={formData.active}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Switch color="primary" {...field} checked={field.value} />}
                    label="Activate Company"
                  />
                )}
              />
              <Controller
                control={control}
                name="has_support_access"
                defaultValue={formData.has_support_access}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Switch color="info" {...field} checked={field.value} />}
                    label="Enable Customer Support"
                  />
                )}
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid size={12}>
          <MultiStepActions activeStep={2} handleBack={handleBack} />
        </Grid>
      </FormGrid>
    </form>
  );
}

export default ConfigurationDetails;
