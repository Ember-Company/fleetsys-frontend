export interface ResetPasswordParams {
  email: string;
}

export type Role = 'MASTER' | 'ADMIN' | 'USER' | 'DRIVER';
// export type Roles = Record<string, RoleName>;
export type RolesMap = Readonly<Omit<Role, 'MASTER'>>;
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  profile: Profile;
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

export interface Profile {
  user: User;
  industry?: string;
  city?: string;
  region?: string;
  postal_code?: string;
  country?: string;
  currency?: string;
  is_24_hour_format?: string;
  street_address?: string;
}
