import React from 'react';
import Link from 'next/link';
import { Button, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Box } from '@mui/system';

import { paths } from '@/paths';
import { ResetFormProps } from '@/components/shared/form/reset-form';
import { SuccessResult } from '@/components/shared/static';

export function UserResetForm({ handleReset }: ResetFormProps) {
  return (
    <Grid size={12} container direction="column" justifyContent="space-around" alignItems="center" width="100%">
      <Grid size={6}>
        <SuccessResult />
      </Grid>
      <Grid size={6} alignItems="center" justifyContent="center">
        <Typography sx={{ mt: 2, mb: 1, textAlign: 'center' }}>All steps completed - New user created</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, mx: 'auto', columnGap: 4 }} width="60%">
          <Button onClick={handleReset} variant="text" sx={{ mx: 'auto' }} size="medium" fullWidth color="primary">
            Reset
          </Button>
          <Button
            LinkComponent={Link}
            href={paths.dashboard.team}
            color="primary"
            size="medium"
            variant="contained"
            fullWidth
          >
            View Employees
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}
