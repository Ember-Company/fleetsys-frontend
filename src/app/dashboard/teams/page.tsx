import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus } from '@phosphor-icons/react/dist/ssr';

import { config } from '@/config';
import { paths } from '@/paths';
import { UsersOverviewTable } from '@/components/dashboard/account/users-overview';

export const metadata = { title: `Teams | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function TeamsPage(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Team Members</Typography>
        </Stack>
        <div>
          <Button
            startIcon={<Plus fontSize="var(--icon-fontSize-md)" />}
            variant="contained"
            LinkComponent={Link}
            href={paths.dashboard.createEmployee}
          >
            New
          </Button>
        </div>
      </Stack>
      <UsersOverviewTable />
    </Stack>
  );
}

// function applyPagination(rows: Team[], page: number, rowsPerPage: number): Team[] {
//   return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
// }
