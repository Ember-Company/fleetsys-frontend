'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card } from '@mui/material';

import MultiStepForm, { MultiStepFormConfig } from '@/components/shared/form/multi-step-form';

import { AccountFormSchema, AccountValues, defaultAccountValues } from './schemas';
import { AccountFormContent } from './user-account-form';
import { ProfileFormContent } from './user-profile-form';
import { UserResetForm } from './user-reset-form';
import { SubmitFormContent } from './user-submit-form';

const formConfig: MultiStepFormConfig<AccountValues> = {
  0: {
    title: 'Account Details',
    component: AccountFormContent,
  },
  1: {
    title: 'Profile Details (Optional)',
    component: ProfileFormContent,
  },
  2: {
    title: 'Review Details',
    component: SubmitFormContent,
    isEnd: true,
  },
};

export function CreateUserForm(): React.JSX.Element {
  return (
    <Card sx={{ maxHeight: '800px', minHeight: '600px' }}>
      <MultiStepForm<AccountValues>
        configProps={formConfig}
        defaultValues={defaultAccountValues}
        resolver={zodResolver(AccountFormSchema)}
        ResetComponent={UserResetForm}
        asChild
      />
    </Card>
  );
}
