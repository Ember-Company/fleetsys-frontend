import * as React from 'react';
import type { Metadata } from 'next';

import { config } from '@/config';
import VehicleTabs from '@/components/dashboard/vehicles/tabs';

export const metadata = { title: `Vehicles | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return <VehicleTabs />;
}
