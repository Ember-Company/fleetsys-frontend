import * as React from 'react';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

import { type VTabsConfig, type VTabsConfigTransformed } from '@/types/vehicles';
import { config } from '@/config';
import { VehicleTabsData } from '@/components/dashboard/vehicles/config';

const VehicleTabs = dynamic(() => import('@/components/dashboard/vehicles/tabs'));

export const metadata = { title: `Vehicles | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  const tabs = VehicleTabsData.reduce(
    (acc: VTabsConfigTransformed, tabsConfig: VTabsConfig): VTabsConfigTransformed => {
      const { title, panel } = tabsConfig;

      if (!acc?.panels) {
        acc.panels = [];
      }

      if (!acc?.titles) {
        acc.titles = [];
      }

      acc.titles.push(title);
      acc.panels.push(panel);

      return acc;
    },
    { titles: [], panels: [] } satisfies VTabsConfigTransformed
  );

  return <VehicleTabs tabs={tabs} />;
}
