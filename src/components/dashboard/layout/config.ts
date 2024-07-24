import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'overview', title: 'Overview', href: paths.dashboard.overview, icon: 'chart-pie' },
  { key: 'maintenace', title: 'Vehicles', href: paths.dashboard.vehicles, icon: 'wrench' },
  { key: 'tracking', title: 'Tracking', href: paths.dashboard.integrations, icon: 'plugs-connected' },
  { key: 'team', title: 'Team', href: paths.dashboard.team, icon: 'users' },
  { key: 'settings', title: 'Settings', href: paths.dashboard.settings, icon: 'gear-six' },
  { key: 'account', title: 'Account', href: paths.dashboard.account, icon: 'user' },
] satisfies NavItemConfig[];
