import { z as zod } from 'zod';

const stripNonNumeric = (value: string) => value.replace(/\D/g, '');

export const CreateAccountSchema = zod.object({
  name: zod.string().min(1, { message: 'Name is required' }),
  email: zod.string().email(),
  phone_number: zod
    .string()
    .transform((value) => stripNonNumeric(value ?? ''))
    .refine((value) => value.length <= 15, {
      message: 'Phone number cannot have more than 15 digits',
    })
    .optional(),
  role: zod.enum(['ADMIN', 'USER', 'DRIVER', 'TECHNICIAN']).optional(),
  // password: zod.string().min(1, { message: 'Password is required' }),
  password: zod.string().optional(),
});

export const ProfileSchema = zod.object({
  user_meta: zod
    .object({
      industry: zod.string().optional(),
      city: zod.string().optional(),
      region: zod.string().optional(),
      country: zod.string().optional(),
    })
    .optional(),
});

export const AccountFormSchema = CreateAccountSchema.merge(ProfileSchema);
export const EditFormSchema = CreateAccountSchema.extend({
  password: zod.string().nullable().optional(),
}).merge(ProfileSchema);

export const defaultAccountValues = {
  name: '',
  email: '',
  role: 'USER',
  phone_number: '',
  password: '',
  user_meta: {
    industry: '',
    city: '',
    region: '',
    country: '',
  },
} satisfies AccountValues;

export type AccountValues = zod.infer<typeof AccountFormSchema>;
export type EditAccountValues = zod.infer<typeof EditFormSchema>;

export type UserRoles = 'ADMIN' | 'USER' | 'DRIVER';
export const roles: UserRoles[] = ['ADMIN', 'USER', 'DRIVER'];
