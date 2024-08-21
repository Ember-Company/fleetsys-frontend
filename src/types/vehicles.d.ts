import { type ReactNode } from 'react';

export interface VTabsConfig {
  title: string;
  panel: ReactNode;
}

export interface VTabsConfigTransformed {
  titles: string[];
  panels: ReactNode[];
}

export interface Vehicle {
  name: string;
}
