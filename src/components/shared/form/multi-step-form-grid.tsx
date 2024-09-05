import React, { PropsWithChildren } from 'react';
import { Button, Stack, Step, StepLabel, Stepper } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Box } from '@mui/system';
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';

export interface StepActionProps {
  activeStep: number;
  handleBack: () => void;
  stepsMap: readonly string[];
}

export function StepActions({
  activeStep,
  children,
  handleBack,
  stepsMap,
}: StepActionProps & PropsWithChildren): React.JSX.Element {
  const isEnd = (mod?: number): boolean => {
    if (mod) {
      return activeStep === stepsMap.length - mod;
    }

    return activeStep === stepsMap.length;
  };

  return (
    <React.Fragment>
      <Grid size={10} width="100%">
        {children}
      </Grid>

      {!isEnd() && (
        <Grid
          size={2}
          display="flex"
          direction="row"
          width="100%"
          justifyContent="space-around"
          sx={{
            pt: 2,
            mb: 4,
            px: 20,
          }}
        >
          <Box sx={{ flex: '1 1 auto' }}>
            <Stepper alternativeLabel>
              {stepsMap.map((label, index) => (
                <Step key={label} completed={activeStep > index} active={index === activeStep}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </Grid>
      )}
    </React.Fragment>
  );
}

export function MultiStepActions({
  handleBack = () => {},
  isEnd = false,
  activeStep,
  submitAction,
}: {
  handleBack?: () => void;
  submitAction?: () => void;
  // standard?: boolean;
  activeStep: number;
  isEnd?: boolean;
}): React.JSX.Element {
  return (
    <Stack justifyContent="space-between" direction="row">
      <Button color="primary" variant="outlined" disabled={activeStep === 0} onClick={handleBack}>
        Back
      </Button>
      <Button
        variant={isEnd ? 'contained' : 'outlined'}
        type="submit"
        size="small"
        onClick={isEnd && submitAction ? submitAction : undefined}
      >
        {isEnd ? 'Submit' : 'Next'}
      </Button>
    </Stack>
  );
}
