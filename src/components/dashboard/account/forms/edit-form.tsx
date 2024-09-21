import React, { PropsWithChildren, useEffect } from 'react';
import { Button, FormControl, FormHelperText, Input, InputLabel, TextField } from '@mui/material';
import { Grid } from '@mui/system';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';

import { FormContentProps } from '@/types/forms';
import { UpdateUserPayload, User } from '@/types/user';
import { logger } from '@/lib/default-logger';
import { useTransformData } from '@/hooks/use-transform';
import { FormGrid } from '@/components/shared/form';

import { AccountValues } from './schemas';

type Props = {};

export default function EditForm({ children }: PropsWithChildren) {
  return (
    <FormGrid title="" fullWidth fullWidthPadding={5}>
      {/* {children} */}

      <Grid size={12}>
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Grid>
    </FormGrid>
  );
}
