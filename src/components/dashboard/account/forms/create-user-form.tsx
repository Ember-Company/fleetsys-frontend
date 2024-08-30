'use client';

import React, { useState, type PropsWithChildren } from 'react';
import {
  Box,
  Button,
  Card,
  FormControl,
  InputLabel,
  OutlinedInput,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';

import { User } from '@/types/user';

import { CreateUserSteps } from '../config';

type FormContentMap = Record<number, React.ComponentType>;

interface StepActionProps {
  activeStep: number;
  handleNext: () => void;
  handleBack: () => void;
  handleReset: () => void;
}

const formSteps: FormContentMap = {
  0: AccountFormContent,
  1: ProfileFormContent,
  2: SubmitFormContent,
};

function CreateUserForm(): React.JSX.Element {
  const [activeStep, setActiveStep] = useState(0);
  const ActiveForm = formSteps[activeStep];
  const [account, setAccount] = useState<Omit<User, 'profile'>>(null);

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
    <Card sx={{ maxHeight: '800px', height: '800px' }}>
      <Stack sx={{ p: 10, height: '100%' }}>
        <Grid
          container
          width="100%"
          direction="row"
          spacing={3}
          flexGrow={1}
          justifyContent="center"
          alignItems="center"
        >
          <StepActions
            activeStep={activeStep}
            handleBack={handleBack}
            handleNext={handleNext}
            handleReset={handleReset}
          >
            {activeStep === CreateUserSteps.length ? (
              <Grid size={12}>
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - New user created</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button onClick={handleReset} variant="contained">
                      Reset
                    </Button>
                  </Box>
                </React.Fragment>
              </Grid>
            ) : (
              <ActiveForm />
            )}
          </StepActions>
        </Grid>
      </Stack>
    </Card>
  );
}

function StepActions({
  activeStep,
  children,
  handleReset,
  handleBack,
  handleNext,
}: StepActionProps & PropsWithChildren): React.JSX.Element {
  const isEnd = (mod?: number): boolean => {
    if (mod) {
      return activeStep === CreateUserSteps.length - mod;
    }

    return activeStep === CreateUserSteps.length;
  };

  return (
    <React.Fragment>
      <Grid size={12}>{children}</Grid>
      {!isEnd() && (
        <Grid
          size={12}
          display="flex"
          direction="row"
          alignSelf="flex-end"
          justifyContent="space-around"
          sx={{
            pt: 2,
            mb: 4,
          }}
          offset={{
            md: 'auto',
          }}
        >
          <Button color="primary" variant="outlined" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
            <ArrowLeft size={20} />
          </Button>
          <Box sx={{ flex: '1 1 auto' }}>
            <Stepper alternativeLabel>
              {CreateUserSteps.map((label, index) => (
                <Step key={label} completed={activeStep > index} active={index === activeStep}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
          <Button variant={isEnd(1) ? 'contained' : 'outlined'} onClick={handleNext} size="small">
            {isEnd(1) ? 'Finish' : <ArrowRight size={20} />}
          </Button>
        </Grid>
      )}
    </React.Fragment>
  );
}

function AccountFormContent(): React.JSX.Element {
  return (
    <form>
      <Stack sx={{ height: '100%', background: 'blue' }}>
        <Grid container size={12} direction="column" justifyContent="space-between">
          <Grid size={4}>
            <Typography variant="h4">Account Form Content</Typography>
          </Grid>
          <Grid size={12}>
            <FormControl>
              <InputLabel>Email</InputLabel>
              <OutlinedInput label="Email" type="text" />
            </FormControl>
          </Grid>
        </Grid>
      </Stack>
    </form>
  );
}

function ProfileFormContent(): React.JSX.Element {
  return (
    // <Grid item xs={12} sx={{ padding: '20px' }} alignItems="center" justifyContent="center">
    <Typography variant="h2" textAlign="center">
      Profile Form Content
    </Typography>
    // </Grid>
  );
}

function SubmitFormContent(): React.JSX.Element {
  return (
    // <Grid item xs={12} sx={{ padding: '20px' }} alignItems="center" justifyContent="center">
    <Typography variant="h4" textAlign="center">
      Submit Content
    </Typography>
    // </Grid>
  );
}

export default CreateUserForm;
