import { PropsWithChildren } from 'react';
import { Divider, Typography } from '@mui/material';
import { Box, Grid, Stack } from '@mui/system';

export function FormGrid({
  title,
  fullWidth = false,
  fullWidthPadding = 0,
  children,
}: { title: string; fullWidth?: boolean; fullWidthPadding?: number } & PropsWithChildren): React.JSX.Element {
  return (
    <Stack direction="column" justifyContent="space-around">
      <Box sx={{ px: fullWidth ? 0 + fullWidthPadding : 20, py: 3 }}>
        <Typography variant="h4">{title}</Typography>
      </Box>
      <Divider variant="fullWidth" />
      <Stack sx={{ px: fullWidth ? 0 + fullWidthPadding : 20, py: 4, mt: 2 }}>
        <Grid container size={12} height="100%" width="100%" alignItems="center" spacing={3}>
          {children}
        </Grid>
      </Stack>
    </Stack>
  );
}
