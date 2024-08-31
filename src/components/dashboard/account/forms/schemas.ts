import { z as zod } from 'zod';

export const AccountFormSchema = zod.object({
  name: zod.string().min(1, { message: 'Status Name is required' }),
  email: zod.string().email(),
  role: zod.enum(['ADMIN', 'USER', 'DRIVER']),
  password: zod.string().min(1, { message: 'Password is required' }),
});

export const ProfileFormSchema = zod.object({
  user_meta: zod
    .object({
      industry: zod.string().optional(),
      city: zod.string().optional(),
      region: zod.string().optional(),
      country: zod.string().optional(),
    })
    .optional(),
});

export const SubmitFormSchema = AccountFormSchema.merge(ProfileFormSchema);

export type RegisterValues = zod.infer<typeof AccountFormSchema>;
export type ProfileValues = zod.infer<typeof ProfileFormSchema>;
export type SubmitValues = zod.infer<typeof SubmitFormSchema>;

export type UserRoles = 'ADMIN' | 'USER' | 'DRIVER';
export const roles: UserRoles[] = ['ADMIN', 'USER', 'DRIVER'];
