import { Typography } from '@mui/material';

import { MultiFormProps } from '@/types/forms';

import { SubmitValues } from './schemas';

export function SubmitFormContent({ control, formData }: MultiFormProps<SubmitValues>): React.JSX.Element {
  return (
    <Typography variant="h4" textAlign="center">
      Submit Content
    </Typography>
  );
}
