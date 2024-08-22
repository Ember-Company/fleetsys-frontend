import { type User } from './user';
import type { Vehicle } from './vehicles';

export interface Company {
  id: string;
  name: string;
  users_count: number;
  vehicles_count: number;
}

export interface CompanyDetails extends Company {
  users: Omit<User, 'profile'>[];
  vehicles: Vehicle[];
}
