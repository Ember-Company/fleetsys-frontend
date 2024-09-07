import { z as zod } from 'zod';

const stripNonNumeric = (value: string) => value.replace(/\D/g, '');

export const CompanyFormSchema = zod.object({
  name: zod.string(),
  active: zod.boolean(),
  industry: zod.string().optional(),
  subscription_type: zod.enum(['Annual', 'Monthly']),
  max_vehicles: zod.number().positive().optional(),
  contact_name: zod.string().optional(),
  contact_email: zod.string().optional(),
  contact_phone: zod
    .string()
    .transform((value) => stripNonNumeric(value ?? ''))
    .refine((value) => value.length <= 15, {
      message: 'Phone number cannot have more than 15 digits',
    }),
  country: zod.string().optional(),
  state: zod.string().optional(),
  city: zod.string().optional(),
  max_drivers: zod.number().positive().optional(),
  max_routes: zod.number().positive().optional(),
  has_support_access: zod.boolean().optional(),
});

export type CompanySchemaValues = zod.infer<typeof CompanyFormSchema>;
