import React from 'react';
import { Typography } from '@mui/material';

import CompanyList from '@/components/dashboard/companies';

export default function ClientsPage(): React.JSX.Element {
  return (
    <div className="">
      <Typography variant="h4" mb={6}>
        Companies
      </Typography>
      <CompanyList />
    </div>
  );
}
