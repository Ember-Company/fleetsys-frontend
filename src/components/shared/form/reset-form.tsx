import React from 'react';
import { Button, Typography } from '@mui/material';
import { Box, Grid } from '@mui/system';

import { SuccessResult } from '@/components/shared/static';

interface ResetFormProps {
  handleReset: () => void;
  textContent?: string;
  showResetButton?: boolean;
}

export default function ResetForm({ handleReset, textContent, showResetButton = true }: ResetFormProps) {
  return (
    <Grid size={12} container direction="column" justifyContent="space-around" alignItems="center" width="100%">
      <Grid size={6}>
        <SuccessResult />
      </Grid>
      <Grid size={6} alignItems="center" justifyContent="center">
        <Typography sx={{ mt: 2, mb: 1, textAlign: 'center' }}>{textContent ?? ''}</Typography>
        {showResetButton && (
          <Button onClick={handleReset} variant="text" sx={{ mx: 'auto' }} size="medium" fullWidth color="primary">
            Reset
          </Button>
        )}
      </Grid>
    </Grid>
  );
}
