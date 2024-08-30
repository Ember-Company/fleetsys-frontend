import React from 'react';
import dynamic from 'next/dynamic';
import { Box } from '@mui/system';

import { type VTabsConfig } from '@/types/vehicles';

const VStatusPanel = dynamic(() => import('./status-panel'));
const VehicleTypesPanel = dynamic(() => import('./v-types-panel'));
const VehicleDataTable = dynamic(() => import('./overview-panel'));

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
    title: 'Categories & Attributes',
    panel: <VehicleTypesPanel />,
  },
];
