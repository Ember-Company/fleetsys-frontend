export interface ResetPasswordParams {
  email: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
}

export interface UserPayload extends Pick<User, 'email' | 'phone'> {
  name?: string;
  password: string;
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
