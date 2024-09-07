import React, { PropsWithChildren } from 'react';
import { Button, CircularProgress, Stack, Step, StepLabel, Stepper } from '@mui/material';
import Grid, { Grid2Props } from '@mui/material/Grid2';
import { Box, SxProps } from '@mui/system';
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';

import { Theme } from '@/styles/theme/types';

export interface StepActionProps {
  activeStep: number;
  handleBack: () => void;
  stepsMap: readonly string[];
  stepperGridStyle?: Grid2Props['sx'];
}

export function StepActions({
  activeStep,
  children,
  handleBack,
  stepsMap,
  stepperGridStyle = {},
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
            ...stepperGridStyle,
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
  loading = false,
}: {
  handleBack?: () => void;
  submitAction?: () => void;
  // standard?: boolean;
  activeStep: number;
  isEnd?: boolean;
  loading?: boolean;
}): React.JSX.Element {
  return (
    <Stack justifyContent="space-between" direction="row" mt={2}>
      <Button color="primary" variant="outlined" disabled={activeStep === 0} onClick={handleBack}>
        Back
      </Button>
      <Button
        variant={isEnd ? 'contained' : 'outlined'}
        type="submit"
        size="small"
        onClick={!isEnd && submitAction ? submitAction : undefined}
      >
        {loading ? <CircularProgress /> : isEnd ? 'Submit' : 'Next'}
      </Button>
    </Stack>
  );
}
