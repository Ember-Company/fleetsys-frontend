'use client';

import React, { useMemo, useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';

import { type VTabsConfig, type VTabsConfigTransformed } from '@/types/vehicles';

import { VehicleTabsData } from './config';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps): React.JSX.Element {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index.toString()}`}
      aria-labelledby={`full-width-tab-${index.toString()}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function VehicleTabs(): React.JSX.Element {
  const [tabValue, setTabValue] = useState(0);

  const tabs = useMemo(() => {
    return VehicleTabsData.reduce(
      (acc: VTabsConfigTransformed, config: VTabsConfig): VTabsConfigTransformed => {
        const { title, panel } = config;

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
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number): void => {
    setTabValue(newValue);
  };

  return (
    <>
      <Box borderBottom={1} borderColor="divider">
        <Tabs value={tabValue} onChange={handleChange}>
          {tabs.titles.map((title, index) => (
            <Tab label={title} tabIndex={index} key={title} sx={{ paddingX: 5 }} />
          ))}
        </Tabs>
      </Box>
      {tabs.panels.map((PanelComponent, index) => (
        <TabPanel value={tabValue} index={index} key={PanelComponent?.toLocaleString()}>
          {PanelComponent}
        </TabPanel>
      ))}
    </>
  );
}

export default VehicleTabs;
