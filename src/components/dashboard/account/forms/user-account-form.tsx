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
import { AccountFields } from '@/components/shared/form/fields';
import { FormGrid, MultiStepActions } from '@/components/shared/form/index';

import { AccountValues, roles } from './schemas';

export function AccountFormContent({
  formData,
  updateFormState,
  handleBack,
  submitHandlers,
}: MultiFormPropsContext<AccountValues>): React.JSX.Element {
  const { handleSubmit } = useFormContext<AccountValues>();
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  return (
    <form onSubmit={handleSubmit(updateFormState)}>
      <FormGrid title="Register User">
        <AccountFields hideFields={{ password: false }} />

        {submitHandlers()}
      </FormGrid>
    </form>
  );
}
