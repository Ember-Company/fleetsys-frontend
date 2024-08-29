import type { NavItemConfig } from '@/types/nav';
import type { Role } from '@/types/user';
import { paths } from '@/paths';

function withRoleAccess(config: NavItemConfig[], role: Role | Role[]): NavItemConfig[] {
  return config.map((item) => {
    return {
      ...item,
      roleAccess: role,
    };
  });
}

// Universal Options
const defaultNavItems = [
  { key: 'overview', title: 'Overview', href: paths.dashboard.overview, icon: 'chart-pie' },
  { key: 'settings', title: 'Settings', href: paths.dashboard.settings, icon: 'gear-six' },
  { key: 'account', title: 'Account', href: paths.dashboard.account, icon: 'user' },
  { key: 'not-authorized', disabled: true, href: '/dashboard/not-authorized/', hidden: true },
] satisfies NavItemConfig[];

const userNavItems = withRoleAccess(
  [
    { key: 'tracking', title: 'Tracking', href: paths.dashboard.integrations, icon: 'plugs-connected' },
    { key: 'vehicles', title: 'Vehicles', href: paths.dashboard.vehicles, icon: 'wrench' },
  ],
  ['USER', 'ADMIN']
);

const MasterNavItems = withRoleAccess(
  [{ key: 'clients', title: 'Clients', href: paths.dashboard.clients, icon: 'companies' }],
  'MASTER'
);

const AdminNavItems = withRoleAccess(
  [{ key: 'team', title: 'Team', href: paths.dashboard.team, icon: 'users' }],
  'ADMIN'
);

type NavConfigType = Record<Role, NavItemConfig[]>;

export const NavConfig = {
  MASTER: [...MasterNavItems, ...defaultNavItems],
  ADMIN: [...defaultNavItems, ...userNavItems, ...AdminNavItems],
  USER: [...defaultNavItems, ...userNavItems],
  DRIVER: [],
} satisfies NavConfigType;
