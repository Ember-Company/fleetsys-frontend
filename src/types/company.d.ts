import { type User } from './user';
import type { Vehicle } from './vehicles';

export interface Company {
  id: string;
  name: string;
  users: User[];
  vehicles: Vehicle[];
}
