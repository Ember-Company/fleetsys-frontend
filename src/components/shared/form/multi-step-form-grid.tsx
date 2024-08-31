import React, { PropsWithChildren } from 'react';
import { Button, Step, StepLabel, Stepper } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Box } from '@mui/system';
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';

export interface StepActionProps {
  activeStep: number;
  handleNext: () => void;
  handleBack: () => void;
  handleReset: () => void;
  stepsMap: readonly string[];
}

export function StepActions({
  activeStep,
  children,
  handleReset,
  handleBack,
  handleNext,
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
          <Button color="primary" variant="outlined" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
            <ArrowLeft size={20} />
          </Button>
          <Box sx={{ flex: '1 1 auto' }}>
            <Stepper alternativeLabel>
              {stepsMap.map((label, index) => (
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
