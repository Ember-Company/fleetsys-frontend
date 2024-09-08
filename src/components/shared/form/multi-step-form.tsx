import React, { memo, useCallback, useState } from 'react';
import { StackProps } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Stack, SystemCssProperties } from '@mui/system';
import { DefaultValues, FieldValues, FormProvider, Resolver, useForm, UseFormProps } from 'react-hook-form';
import { z as zod } from 'zod';

import { MultiFormPropsContext } from '@/types/forms';

import { MultiStepActions, StepActions } from './multi-step-form-grid';
import ResetForm, { ResetFormProps } from './reset-form';

interface MultiStepFormProps<TSchema> {
  defaultValues: TSchema;
  configProps: MultiStepFormConfig<TSchema>;
  resolver: UseFormProps['resolver'];
  asChild?: boolean;
  containerStyle?: SystemCssProperties;
  ResetComponent?: React.ComponentType<ResetFormProps>;
}

export interface MultiStepFormConfig<S> {
  [index: number]: {
    title: string;
    component: React.ComponentType<MultiFormPropsContext<S>>;
    isEnd?: boolean;
  };
}

export default function MultiStepForm<S>({
  configProps,
  defaultValues,
  resolver,
  asChild = false,
  containerStyle = {},
  ResetComponent,
}: MultiStepFormProps<S>) {
  const steps = Object.keys(configProps);

  const [activeStep, setActiveStep] = useState<number>(0);
  const [formData, setFormData] = useState<S>(defaultValues);
  const methods = useForm({
    defaultValues: defaultValues as DefaultValues<S>,
    resolver,
  });

  const handleNext = (): void => {
    methods.clearErrors();
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = (): void => {
    methods.clearErrors();

    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const updateFormState = async (data: Partial<S>) => {
    setFormData({
      ...formData,
      ...data,
    });

    handleNext();
  };

  const handleReset = (): void => {
    setActiveStep(0);
    setFormData(defaultValues);

    methods.reset();
  };

  const submitHandlers = useCallback(
    (isEnd?: boolean, isLoading?: boolean) => (
      <Grid size={12}>
        <MultiStepActions activeStep={activeStep} handleBack={handleBack} isEnd={isEnd} loading={isLoading} />
      </Grid>
    ),
    [activeStep, handleBack]
  );

  const getActiveForm = () => {
    const sharedProps = {
      updateFormState,
      formData,
      handleBack,
      handleNext,
      submitHandlers,
    } satisfies MultiFormPropsContext<S>;

    if (activeStep === steps.length) {
      return ResetComponent ? (
        <ResetComponent handleReset={handleReset} />
      ) : (
        <ResetForm handleReset={handleReset} textContent="Text Form Completed" />
      );
    }

    const FormStep = configProps[activeStep]['component'] ?? null;
    return <FormStep {...sharedProps} />;
  };

  return (
    <Stack
      sx={{
        maxHeight: asChild ? '100%' : '800px',
        minHeight: asChild ? '100%' : '600px',
        width: '100%',
        ...containerStyle,
      }}
    >
      <FormProvider {...methods}>
        <Grid
          container
          width="100%"
          direction="column"
          spacing={2}
          flexGrow={1}
          height="100%"
          justifyContent="space-between"
          alignItems="center"
        >
          <StepActions
            stepperGridStyle={{ px: 0 }}
            activeStep={activeStep}
            handleBack={handleBack}
            stepsMap={Object.values(configProps).map((step) => step.title)}
          >
            {getActiveForm()}
          </StepActions>
        </Grid>
      </FormProvider>
    </Stack>
  );
}
