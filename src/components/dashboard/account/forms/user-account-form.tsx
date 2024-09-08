import React, { useCallback, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  OutlinedInputProps,
  Select,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { EyeSlash as EyeSlashIcon } from '@phosphor-icons/react/dist/ssr/EyeSlash';
import { Controller, useForm, useFormContext } from 'react-hook-form';
import { useIMask } from 'react-imask';
import { NumberFormatBase, PatternFormat } from 'react-number-format';

import { MultiFormProps, MultiFormPropsContext } from '@/types/forms';
import { logger } from '@/lib/default-logger';
import { FormGrid, MultiStepActions } from '@/components/shared/form/index';

import { AccountValues, roles } from './schemas';

export function AccountFormContent({
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
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  return (
    <form onSubmit={handleSubmit(updateFormState)}>
      <FormGrid title="Account Details">
        <Grid size={6}>
          <Controller
            control={control}
            name="name"
            defaultValue={formData.name}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>Name</InputLabel>
                <OutlinedInput label="Name" type="text" {...field} />
                <FormHelperText>{errors?.name?.message ?? null}</FormHelperText>
              </FormControl>
            )}
          />
        </Grid>
        <Grid size={6}>
          {/* <FormControl fullWidth> */}
          <Controller
            control={control}
            name="role"
            defaultValue={formData.role}
            render={({ field }) => (
              <FormControl fullWidth>
                <Select
                  {...field}
                  sx={{
                    textTransform: 'capitalize',
                    mb: errors?.name?.message ? 2.75 : 0,
                  }}
                >
                  {roles.map((role) => (
                    <MenuItem key={role} value={role}>
                      {role}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        </Grid>

        <Grid size={6}>
          <Controller
            control={control}
            name="email"
            defaultValue={formData.email}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>Email</InputLabel>
                <OutlinedInput {...field} label="Email" type="email" />
                <FormHelperText>{errors?.email?.message ?? null}</FormHelperText>
              </FormControl>
            )}
          />
        </Grid>
        <Grid size={6}>
          <Controller
            control={control}
            name="password"
            defaultValue={formData.password}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                  {...field}
                  endAdornment={
                    showPassword ? (
                      <EyeIcon
                        cursor="pointer"
                        fontSize="var(--icon-fontSize-md)"
                        onClick={(): void => {
                          setShowPassword(false);
                        }}
                      />
                    ) : (
                      <EyeSlashIcon
                        cursor="pointer"
                        fontSize="var(--icon-fontSize-md)"
                        onClick={(): void => {
                          setShowPassword(true);
                        }}
                      />
                    )
                  }
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                />
                <FormHelperText>{errors?.password?.message ?? null}</FormHelperText>
              </FormControl>
            )}
          />
        </Grid>
        <Grid size={6}>
          <Controller
            control={control}
            name="phone_number"
            defaultValue={formData.phone_number}
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
                <InputLabel>Phone (Optional)</InputLabel>
                <PatternFormat
                  customInput={OutlinedInput}
                  format="+### (##) ####-####"
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  name={name}
                  getInputRef={ref}
                  label="Phone (Optional)"
                  // prefix={Boolean(value) ? '+255 ' : ''}
                  mask="_"
                  isAllowed={(values) => !Number.isInteger(values.value)}
                  allowEmptyFormatting
                />
                <FormHelperText>{errors?.phone_number?.message ?? null}</FormHelperText>
              </FormControl>
            )}
          />
        </Grid>

        {submitHandlers()}
      </FormGrid>
    </form>
  );
}
