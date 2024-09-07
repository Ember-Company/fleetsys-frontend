import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { FormProvider, useForm, UseFormReturn } from 'react-hook-form';

import { FormGrid, StepActions } from '@/components/shared/form';

import CompanyDetails from './company-details';
import CompanySubmit from './company-submit';
import ContactDetails from './contact-details';
import { CompanyFormSchema, CompanySchemaValues } from './schemas';

type Props = {};

const createCompanySteps: Record<number, string> = {
  0: 'Company Details',
  1: 'Contact Information',
  2: 'Finalize',
};

const stepIndexes = Object.keys(createCompanySteps);

const formSteps: Record<number, React.ComponentType> = {
  0: CompanyDetails,
  1: ContactDetails,
  2: CompanySubmit,
};

const defaultValues = {
  name: '',
  active: false,
  contact_phone: '',
  contact_email: '',
  contact_name: '',
  subscription_type: 'Monthly',
  city: '',
  country: '',
  state: '',
  industry: '',
  has_support_access: true,
  max_drivers: 10,
  max_routes: 10,
  max_vehicles: 15,
} satisfies CompanySchemaValues;

function CreateCompanyForm({}: Props) {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [formData, setFormData] = useState<CompanySchemaValues>(defaultValues);
  const methods = useForm({
    defaultValues,
    resolver: zodResolver(CompanyFormSchema),
  });

  const handleNext = (): void => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = (): void => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const updateFormState = (data: Partial<CompanySchemaValues> = {}) => {
    setFormData({
      ...formData,
      ...data,
    });

    handleNext();
  };

  const getActiveForm = () => {
    const FormStep = formSteps[activeStep] ?? null;
    return activeStep === stepIndexes.length ? <div>Hello</div> : <FormStep />;
  };

  return (
    <Stack sx={{ maxHeight: '800px', minHeight: '600px' }}>
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
            stepsMap={Object.values(createCompanySteps)}
          >
            {getActiveForm()}
          </StepActions>
        </Grid>
      </FormProvider>
    </Stack>
  );
}

export default CreateCompanyForm;
