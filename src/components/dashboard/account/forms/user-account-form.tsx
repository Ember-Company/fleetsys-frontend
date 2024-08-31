import React from 'react';
import { FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { EyeSlash as EyeSlashIcon } from '@phosphor-icons/react/dist/ssr/EyeSlash';
import { Controller } from 'react-hook-form';

import { MultiFormProps } from '@/types/forms';
import { FormGrid } from '@/components/shared/form';

import { RegisterValues, roles, SubmitValues } from './schemas';

export function AccountFormContent({
  control,
  formData,
  updateFormState,
}: MultiFormProps<RegisterValues, SubmitValues>): React.JSX.Element {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  return (
    <form>
      <FormGrid title="Account Details">
        <Grid size={6}>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>Name</InputLabel>
                <OutlinedInput label="Name" type="text" {...field} />
              </FormControl>
            )}
          />
        </Grid>
        <Grid size={6}>
          {/* <FormControl fullWidth> */}
          <Controller
            control={control}
            name="role"
            defaultValue="USER"
            render={({ field }) => (
              <FormControl fullWidth>
                <Select
                  {...field}
                  sx={{
                    textTransform: 'capitalize',
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
          {/* </FormControl> */}
        </Grid>
        <Grid size={6}>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>Email</InputLabel>
                <OutlinedInput {...field} label="Email" type="email" />
              </FormControl>
            )}
          />
        </Grid>
        <Grid size={6}>
          <Controller
            control={control}
            name="password"
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
              </FormControl>
            )}
          />
        </Grid>
      </FormGrid>
    </form>
  );
}
