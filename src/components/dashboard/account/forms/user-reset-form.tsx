import React from 'react';
import { Button, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Box } from '@mui/system';

interface ResetFormProps {
  handleReset: () => void;
}

export function ResetForm({ handleReset }: ResetFormProps) {
  return (
    <Grid size={12}>
      <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - New user created</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Button onClick={handleReset} variant="contained">
          Reset
        </Button>
      </Box>
    </Grid>
  );
}
