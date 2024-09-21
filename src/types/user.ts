import { Company } from './company';

export interface ResetPasswordParams {
  email: string;
}

export type Role = 'MASTER' | 'ADMIN' | 'USER' | 'DRIVER' | 'TECHNICIAN';
// export type Roles = Record<string, RoleName>;
export type RolesMap = Readonly<Omit<Role, 'MASTER'>>;

export interface User {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  role: Role;
  profile: Profile;
  profile_id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  profile_image: string;
  email_verified_at: string;
  company_id: string;
  company?: Company;
}

export interface UserWithoutMaster extends Omit<User, 'role'> {
  role: RolesMap;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
  token_type: string;
}

export interface UserPayload extends Pick<User, 'email'> {
  name?: string;
  password: string;
  phone?: string;
}

export interface UpdateUserPayload
  extends Partial<Omit<User, 'password' | 'profile' | 'id' | 'company' | 'updated_at' | 'created_at'>> {
  user_meta?: UserRegisterMetadata;
}

export interface UserRegisterPayload extends Omit<User, 'profile' | 'id'> {
  user_meta?: UserRegisterMetadata;
}

export interface Profile {
  user?: User;
  user_id: string;
  industry?: string;
  city?: string;
  region?: string;
  postal_code?: string;
  country?: string;
  currency?: string;
  is_24_hour_format?: string;
  street_address?: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export interface UserRegisterMetadata
  extends Pick<Profile, 'industry' | 'city' | 'region' | 'country' | 'postal_code' | 'street_address'> {}
