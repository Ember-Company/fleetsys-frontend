import type { NavItemConfig } from '@/types/nav';
import type { Role } from '@/types/user';
import { paths } from '@/paths';

const defaultNavItems = [
  { key: 'overview', title: 'Overview', href: paths.dashboard.overview, icon: 'chart-pie' },
  { key: 'tracking', title: 'Tracking', href: paths.dashboard.integrations, icon: 'plugs-connected' },
  { key: 'maintenace', title: 'Vehicles', href: paths.dashboard.vehicles, icon: 'wrench' },
  { key: 'settings', title: 'Settings', href: paths.dashboard.settings, icon: 'gear-six' },
  { key: 'account', title: 'Account', href: paths.dashboard.account, icon: 'user' },
] satisfies NavItemConfig[];

const MasterNavItems = [
  { key: 'overview', title: 'Overview', href: paths.dashboard.overview, icon: 'chart-pie' },
  { key: 'clients', title: 'Clients', href: paths.dashboard.clients, icon: 'companies' },
  { key: 'settings', title: 'Settings', href: paths.dashboard.settings, icon: 'gear-six' },
  { key: 'account', title: 'Account', href: paths.dashboard.account, icon: 'user' },
] satisfies NavItemConfig[];

const AdminNavItems = [
  { key: 'team', title: 'Team', href: paths.dashboard.team, icon: 'users' },
] satisfies NavItemConfig[];

type NavConfigType = Record<Role, NavItemConfig[]>;
export const NavConfig = {
  MASTER: MasterNavItems,
  ADMIN: [...defaultNavItems, ...AdminNavItems],
  USER: [...defaultNavItems],
  DRIVER: [],
} satisfies NavConfigType;
