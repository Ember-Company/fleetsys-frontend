import React, { useCallback } from 'react';
import { FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import { Grid } from '@mui/system';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { EyeSlash as EyeSlashIcon } from '@phosphor-icons/react/dist/ssr/EyeSlash';
import { Controller, useFormContext } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';

import { FormContentProps } from '@/types/forms';
import { AccountValues, EditAccountValues, roles } from '@/components/dashboard/account/forms/schemas';

import { FieldComponentProps } from './types';

export function AccountFields({
  fieldSize = 'medium',
  disableFields,
  hideFields = { password: true },
}: FieldComponentProps<AccountValues | EditAccountValues>) {
  const {
    control,
    formState: { errors },
    getValues,
  } = useFormContext<AccountValues | EditAccountValues>();
  const formData = getValues();
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const labelSize = fieldSize === 'small' ? fieldSize : 'normal';

  const isDisabled = useCallback(
    (name: keyof typeof formData) => {
      if (!disableFields) return false;

      if (Object.hasOwn(disableFields, name)) {
        return disableFields[name];
      }
    },
    [disableFields]
  );

  const isHidden = useCallback(
    (name: keyof typeof formData) => {
      if (!hideFields) return false;

      if (Object.hasOwn(hideFields, name)) {
        return !hideFields[name];
      }
    },
    [hideFields]
  );

  return (
    <>
      <Grid size={6}>
        <Controller
          control={control}
          name="name"
          disabled={isDisabled('name')}
          defaultValue={formData.name}
          rules={{
            required: 'Name is required',
          }}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel size={labelSize}>Name</InputLabel>
              <OutlinedInput label="Name" type="text" {...field} size={fieldSize} />
              <FormHelperText>{errors?.name?.message ?? null}</FormHelperText>
            </FormControl>
          )}
        />
      </Grid>
      <Grid size={6}>
        <Controller
          control={control}
          name="role"
          defaultValue={formData.role}
          disabled={isDisabled('role')}
          render={({ field }) => (
            <FormControl fullWidth>
              <Select
                {...field}
                sx={{
                  textTransform: 'capitalize',
                  mb: errors?.name?.message ? 2.75 : 0,
                }}
                size={fieldSize}
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
          disabled={isDisabled('email')}
          defaultValue={formData.email}
          rules={{
            required: 'Email is required',
          }}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel size={labelSize}>Email</InputLabel>
              <OutlinedInput {...field} label="Email" type="email" size={fieldSize} />
              <FormHelperText>{errors?.email?.message ?? null}</FormHelperText>
            </FormControl>
          )}
        />
      </Grid>
      {isHidden('password') && (
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
      )}
      <Grid size={6}>
        <Controller
          control={control}
          name="phone_number"
          disabled={isDisabled('phone_number')}
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
              <InputLabel size={labelSize}>Phone (Optional)</InputLabel>
              <PatternFormat
                customInput={OutlinedInput}
                format="+### (##) ####-####"
                value={value}
                size={fieldSize}
                onChange={(event) => onChange(event)}
                onBlur={onBlur}
                name={name}
                getInputRef={ref}
                label="Phone (Optional)"
                mask="_"
                isAllowed={(values) => !Number.isInteger(values.value)}
                allowEmptyFormatting
              />
              <FormHelperText>{errors?.phone_number?.message ?? null}</FormHelperText>
            </FormControl>
          )}
        />
      </Grid>
    </>
  );
}
