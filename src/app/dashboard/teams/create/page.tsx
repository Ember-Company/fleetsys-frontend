import React from 'react';
import { Box, Typography } from '@mui/material';

import { CreateUserForm } from '@/components/dashboard/account/forms';

type Props = {};

function CreateUserPage(props: Props): React.JSX.Element {
  return (
    <Box>
      {/* <Typography>Register New Employee</Typography> */}
      <CreateUserForm />
    </Box>
  );
}

export default CreateUserPage;
