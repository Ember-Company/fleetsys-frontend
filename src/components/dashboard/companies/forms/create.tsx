import React, { useCallback, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Form, FormProvider, useForm, UseFormReturn } from 'react-hook-form';

import { MultiFormPropsContext } from '@/types/forms';
import { logger } from '@/lib/default-logger';
import { FormGrid, MultiStepActions, StepActions } from '@/components/shared/form';

import CompanyDetails from './company-details';
import CompanySubmit from './company-submit';
import ConfigurationDetails from './configuration-details';
import ContactDetails from './contact-details';
import ResetForm from './reset-form';
import { CompanyFormSchema, CompanySchemaValues } from './schemas';

type Props = {};

const createCompanySteps: Record<number, string> = {
  0: 'Basic Details',
  1: 'Contact Information (Optional)',
  2: 'Configuration (Recommended)',
  3: 'Review',
};

const stepIndexes = Object.keys(createCompanySteps);

const formSteps: Record<number, React.ComponentType<MultiFormPropsContext<CompanySchemaValues>>> = {
  0: CompanyDetails,
  1: ContactDetails,
  2: ConfigurationDetails,
  3: CompanySubmit,
};

const defaultValues = {
  name: '',
  industry: '',
  country: '',
  state: '',
  city: '',
  contact_phone: '',
  contact_email: '',
  contact_name: '',
  max_drivers: 10,
  max_routes: 10,
  max_vehicles: 15,
  subscription_type: 'Monthly',
  active: false,
  has_support_access: true,
} satisfies CompanySchemaValues;

function CreateCompanyForm({}: Props) {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [formData, setFormData] = useState<CompanySchemaValues>(defaultValues);
  const methods = useForm({
    defaultValues,
    resolver: zodResolver(CompanyFormSchema),
  });

  const handleNext = (): void => {
    methods.clearErrors();
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = (): void => {
    methods.clearErrors();
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const updateFormState = async (data: Partial<CompanySchemaValues>) => {
    setFormData({
      ...formData,
      ...data,
    });

    methods.clearErrors();
    handleNext();
  };

  const handleReset = (): void => {
    setActiveStep(0);
    setFormData(defaultValues);

    methods.reset();
  };

  const getActiveForm = () => {
    const sharedProps = { updateFormState, formData, handleBack, handleNext };

    const FormStep = formSteps[activeStep] ?? null;
    return activeStep === stepIndexes.length ? <ResetForm handleReset={handleReset} /> : <FormStep {...sharedProps} />;
  };

  const handleCreateCompany = useCallback(
    (values: CompanySchemaValues) => {
      logger.debug(values);
    },
    [logger]
  );

  return (
    <Stack sx={{ maxHeight: '800px', minHeight: '600px', width: '100%' }}>
      <FormProvider {...methods}>
        {/* <form onSubmit={methods.handleSubmit(handleCreateCompany)}> */}
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
            stepsMap={Object.values(createCompanySteps)}
          >
            {getActiveForm()}
          </StepActions>
        </Grid>
        {/* </form> */}
      </FormProvider>
    </Stack>
  );
}

export default CreateCompanyForm;
