'use client';

import React, { useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';

import { type VTabsConfigTransformed } from '@/types/vehicles';

interface VehicleTabsProps {
  tabs: VTabsConfigTransformed;
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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function VehicleTabs({ tabs }: VehicleTabsProps): React.JSX.Element {
  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number): void => {
    setTabValue(newValue);
  };

  return (
    <>
      <Box borderBottom={1} borderColor="divider">
        <Tabs value={tabValue} onChange={handleChange} variant="scrollable">
          {tabs.titles.map((title, index) => (
            <Tab label={title} tabIndex={index} key={title} sx={{ paddingX: 3 }} />
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
