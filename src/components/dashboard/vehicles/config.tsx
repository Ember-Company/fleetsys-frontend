import React from 'react';
import { Box } from '@mui/system';

import { type VTabsConfig } from '@/types/vehicles';

import VehicleDataTable from './overview-panel';
import VStatusPanel from './status-panel';
import VehicleTypesPanel from './v-types-panel';

export const VehicleTabsData: VTabsConfig[] = [
  {
    title: 'Overview',
    panel: <VehicleDataTable />,
  },
  {
    title: 'Analytics',
    panel: <Box>Hello World</Box>,
  },
  {
    title: 'Service History',
    panel: <Box>Ola mundo</Box>,
  },
  {
    title: 'Statuses',
    panel: <VStatusPanel />,
  },
  {
    title: 'Types',
    panel: <VehicleTypesPanel />,
  },
];
