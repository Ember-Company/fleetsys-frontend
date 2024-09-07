import { type User } from './user';
import type { Vehicle } from './vehicles';

export interface Company {
  id: string;
  name: string;
  users_count: number;
  vehicles_count: number;
  active: boolean;
  industry: string | null;
  subscription_type: SubscriptionType;
  max_vehicles: number;
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  country: string | null;
  state: string | null;
  city: string | null;
  max_drivers: number;
  max_routes: number;
  has_support_access: boolean;
  last_active_at: string;
}

export type CompanyField = (keyof Company)[];

type SubscriptionType = 'Annual' | 'Monthly';

export interface CompanyPayload
  extends Partial<Omit<Company, 'id' | 'users_count' | 'vehicles_count' | 'last_active_at'>> {}

export interface CompanyDetails extends Company {
  users: Omit<User, 'profile'>[];
  vehicles: Vehicle[];
}
