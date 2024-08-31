'use client';

import React, { useCallback, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Card, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useForm } from 'react-hook-form';

import { StepActions } from '@/components/shared/form';

import { CreateUserSteps } from '../config';
import {
  AccountFormSchema,
  ProfileFormSchema,
  ProfileValues,
  RegisterValues,
  SubmitFormSchema,
  SubmitValues,
} from './schemas';
import { AccountFormContent } from './user-account-form';
import { ProfileFormContent } from './user-profile-form';
import { ResetForm } from './user-reset-form';
import { SubmitFormContent } from './user-submit-form';

const defaultRegister = {
  name: '',
  email: '',
  role: 'USER',
  password: '',
} satisfies RegisterValues;

const defaultProfile = {
  user_meta: {
    industry: '',
    city: '',
    region: '',
    country: '',
  },
} satisfies ProfileValues;

const defaultSubmit = {
  ...defaultRegister,
  ...defaultProfile,
} satisfies SubmitValues;

export function CreateUserForm(): React.JSX.Element {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [formData, setFormData] = useState<SubmitValues>(defaultSubmit);

  const registerHandler = useForm<RegisterValues>({
    defaultValues: defaultRegister,
    resolver: zodResolver(AccountFormSchema),
  });

  const updateFormState = useCallback((data: Partial<SubmitValues>) => {}, []);

  const profileHandler = useForm<ProfileValues>({
    defaultValues: defaultProfile,
    resolver: zodResolver(ProfileFormSchema),
  });

  const submitHandler = useForm<SubmitValues>({
    defaultValues: defaultSubmit,
    resolver: zodResolver(SubmitFormSchema),
  });

  const getActiveForm = useCallback((): React.ReactNode => {
    switch (activeStep) {
      case 0:
        return <AccountFormContent {...{ ...registerHandler, updateFormState, formData }} />;
      case 1:
        return <ProfileFormContent {...{ ...profileHandler, updateFormState, formData }} />;
      case 2:
        return <SubmitFormContent {...{ ...submitHandler, formData, updateFormState }} />;
      default:
        return null;
    }

    return null;
  }, [activeStep]);

  const handleNext = (): void => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = (): void => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = (): void => {
    setActiveStep(0);
  };

  return (
    <Card sx={{ maxHeight: '800px', height: '600px' }}>
      <Stack sx={{ height: '100%', py: 4 }}>
        <Grid
          container
          width="100%"
          direction="column"
          spacing={2}
          flexGrow={1}
          height="100%"
          justifyContent="space-between"
          alignItems="center"
          // sx={{ background: 'green' }}
        >
          <StepActions
            activeStep={activeStep}
            handleBack={handleBack}
            handleNext={handleNext}
            handleReset={handleReset}
            stepsMap={CreateUserSteps}
          >
            {activeStep === CreateUserSteps.length ? <ResetForm /> : getActiveForm()}
          </StepActions>
        </Grid>
      </Stack>
    </Card>
  );
}
