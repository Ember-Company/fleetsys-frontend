import { z as zod } from 'zod';

const stripNonNumeric = (value: string) => value.replace(/\D/g, '');

export const AccountFormSchema = zod.object({
  name: zod.string().min(1, { message: 'Name is required' }),
  email: zod.string().email(),
  phone_number: zod
    .string()
    .transform((value) => stripNonNumeric(value ?? ''))
    .refine((value) => value.length <= 15, {
      message: 'Phone number cannot have more than 15 digits',
    }),
  role: zod.enum(['ADMIN', 'USER', 'DRIVER']),
  password: zod.string().min(1, { message: 'Password is required' }),
  user_meta: zod
    .object({
      industry: zod.string().optional(),
      city: zod.string().optional(),
      region: zod.string().optional(),
      country: zod.string().optional(),
    })
    .optional(),
});

export type AccountValues = zod.infer<typeof AccountFormSchema>;
export type UserRoles = 'ADMIN' | 'USER' | 'DRIVER';
export const roles: UserRoles[] = ['ADMIN', 'USER', 'DRIVER'];
