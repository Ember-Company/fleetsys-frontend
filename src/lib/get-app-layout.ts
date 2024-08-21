import type { NavItemConfig } from '@/types/nav';
import type { Role } from '@/types/user';
import { NavConfig } from '@/components/dashboard/layout/config';

const getAppLayout = (role: Role | undefined): NavItemConfig[] => {
  if (!role) {
    return [];
  }

  return NavConfig[role];
};

export default getAppLayout;
