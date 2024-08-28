import * as React from 'react';
import type { Metadata } from 'next';
import { Box } from '@mui/material';
import Stack from '@mui/material/Stack';

import { type VTabsConfig } from '@/types/vehicles';
import { config } from '@/config';
import VStatusPanel from '@/components/dashboard/vehicles/panels/vehicle-status-panel';
import VehicleDataTable from '@/components/dashboard/vehicles/vehicle-list';
import VehicleTabs from '@/components/dashboard/vehicles/vehicle-tabs';

export const metadata = { title: `Maintenance | Dashboard | ${config.site.name}` } satisfies Metadata;

const VehicleTabsData: VTabsConfig[] = [
  {
    title: 'Overview',
    panel: <Box>Hello World</Box>,
  },
  {
    title: 'Index',
    panel: <VehicleDataTable />,
  },
  {
    title: 'Service History',
    panel: <Box>Ola mundo</Box>,
  },
  {
    title: 'Vehicle Statuses',
    panel: <VStatusPanel />,
  },
];

export default function Page(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      <VehicleTabs VTabsConfig={VehicleTabsData} />
      {/* <VehicleDataTable /> */}
    </Stack>
  );
}
