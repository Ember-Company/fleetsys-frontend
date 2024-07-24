'use client';

import React, { useMemo, useState } from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';

import { type VTabsConfig, type VTabsConfigTransformed } from '@/types/vehicles';

interface VehicleTabsProps {
  VTabsConfig: VTabsConfig[];
}

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
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function VehicleTabs({ VTabsConfig }: VehicleTabsProps): React.JSX.Element {
  const [tabValue, setTabValue] = useState(0);

  const tabs = useMemo(() => {
    return VTabsConfig.reduce(
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
  }, [VTabsConfig]);

  const handleChange = (event: React.SyntheticEvent, newValue: number): void => {
    setTabValue(newValue);
  };

  return (
    <>
      <Box borderBottom={1} borderColor="divider">
        <Tabs value={tabValue} onChange={handleChange}>
          {/* <Tab label='Vehicles List' /> */}
          {tabs.titles.map((title) => (
            <Tab label={title} key={title} />
          ))}
        </Tabs>
      </Box>
      {tabs.panels.map((PanelComponent, index) => (
        <TabPanel value={tabValue} index={index} key={PanelComponent?.toString()}>
          {PanelComponent}
        </TabPanel>
      ))}
    </>
  );
}

export default VehicleTabs;
