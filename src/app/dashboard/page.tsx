import * as React from 'react';
import type { Metadata } from 'next';
import Grid from '@mui/material/Grid2';
import dayjs from 'dayjs';

import { config } from '@/config';
import { LatestVehicleIssues } from '@/components/dashboard/overview/latest-vehicle-issues';
import { LatestVehicleUpdates } from '@/components/dashboard/overview/latest-vehicle-updates';
import { LoadsDone } from '@/components/dashboard/overview/loads-done';
import { LoadsProgress } from '@/components/dashboard/overview/loads-inprogress';
import { LoadsPaid } from '@/components/dashboard/overview/loads-paid';
import { LoadTrends } from '@/components/dashboard/overview/LoadTrends';
import { TotalProfit } from '@/components/dashboard/overview/total-profit';
import { Traffic } from '@/components/dashboard/overview/traffic';

export const metadata = { title: `Overview | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Grid container spacing={3}>
      <Grid size={{ lg: 3, sm: 6, xs: 12 }}>
        <LoadsDone diff={12} trend="up" sx={{ height: '100%' }} value="500" />
      </Grid>
      <Grid size={{ lg: 3, sm: 6, xs: 12 }}>
        <LoadsPaid diff={16} trend="down" sx={{ height: '100%' }} value="200" />
      </Grid>
      <Grid size={{ lg: 3, sm: 6, xs: 12 }}>
        <LoadsProgress sx={{ height: '100%' }} value={75.5} />
      </Grid>
      <Grid size={{ lg: 3, sm: 6, xs: 12 }}>
        <TotalProfit sx={{ height: '100%' }} value="$15k" />
      </Grid>
      <Grid size={{ lg: 8, xs: 12 }}>
        <LoadTrends
          chartSeries={[{ name: 'Load Quantity', data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20] }]}
          sx={{ height: '100%' }}
        />
      </Grid>
      <Grid size={{ lg: 4, md: 6, xs: 12 }}>
        <Traffic chartSeries={[63, 15, 22]} labels={['Desktop', 'Tablet', 'Phone']} sx={{ height: '100%' }} />
      </Grid>
      <Grid size={{ lg: 4, md: 6, xs: 12 }}>
        <LatestVehicleIssues
          issues={[
            {
              numberplate: 'PRD-005',
              issue: 'Tire Pressure Low',
              updatedAt: dayjs().subtract(18, 'minutes').subtract(5, 'hour').toDate(),
            },
            {
              numberplate: 'PRD-004',
              issue: 'Engine Oil Low',
              updatedAt: dayjs().subtract(41, 'minutes').subtract(3, 'hour').toDate(),
            },
            {
              numberplate: 'PRD-003',
              issue: 'Brake Fluid Low',
              updatedAt: dayjs().subtract(5, 'minutes').subtract(3, 'hour').toDate(),
            },
            {
              numberplate: 'PRD-002',
              issue: 'Coolant Low',
              updatedAt: dayjs().subtract(23, 'minutes').subtract(2, 'hour').toDate(),
            },
            {
              numberplate: 'PRD-001',
              issue: 'Battery Low',
              updatedAt: dayjs().subtract(10, 'minutes').toDate(),
            },
          ]}
          sx={{ height: '100%' }}
        />
      </Grid>
      <Grid size={{ lg: 8, md: 12, xs: 12 }}>
        <LatestVehicleUpdates
          vehicleUpdates={[
            {
              id: 'ORD-007',
              driver: { name: 'Ekaterina Tankova' },
              amount: 30.5,
              status: 'maintenance',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
            {
              id: 'ORD-006',
              driver: { name: 'Cao Yu' },
              amount: 25.1,
              status: 'ongoing',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
            {
              id: 'ORD-004',
              driver: { name: 'Alexa Richardson' },
              amount: 10.99,
              status: 'ready',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
            {
              id: 'ORD-003',
              driver: { name: 'Anje Keizer' },
              amount: 96.43,
              status: 'ongoing',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
            {
              id: 'ORD-002',
              driver: { name: 'Clarke Gillebert' },
              amount: 32.54,
              status: 'unavailable',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
            {
              id: 'ORD-001',
              driver: { name: 'Adam Denisov' },
              amount: 16.76,
              status: 'maintenance',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
          ]}
          sx={{ height: '100%' }}
        />
      </Grid>
    </Grid>
  );
}
