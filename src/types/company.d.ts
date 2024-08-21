import { type User } from './user';

export interface Company {
  id: string;
  name: string;
  users: User[];
}
