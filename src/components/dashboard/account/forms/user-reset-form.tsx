import React from 'react';
import { Button, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Box } from '@mui/system';

import { SuccessResult } from '@/components/shared/static';

interface ResetFormProps {
  handleReset: () => void;
}

export function ResetForm({ handleReset }: ResetFormProps) {
  return (
    <Grid size={12} container direction="column" justifyContent="space-around" alignItems="center" width="100%">
      <Grid size={6}>
        <SuccessResult />
      </Grid>
      <Grid size={6} alignItems="center" justifyContent="center">
        <Typography sx={{ mt: 2, mb: 1, textAlign: 'center' }}>All steps completed - New user created</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, mx: 'auto' }} width="50%">
          <Button onClick={handleReset} variant="contained" sx={{ mx: 'auto' }} size="large" fullWidth>
            Reset
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}
