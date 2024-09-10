import * as React from 'react';
import type { Metadata } from 'next';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { config } from '@/config';
import { UsersOverviewTable } from '@/components/dashboard/account/users-overview';

export const metadata = { title: `Teams | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function TeamsPage(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Team Members</Typography>
        </Stack>
        {/* <div>
          <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
            Add
          </Button>
        </div> */}
      </Stack>
      <UsersOverviewTable />
    </Stack>
  );
}

// function applyPagination(rows: Team[], page: number, rowsPerPage: number): Team[] {
//   return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
// }
