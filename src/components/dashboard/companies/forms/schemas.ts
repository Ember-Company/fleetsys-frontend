import { z as zod } from 'zod';

const stripNonNumeric = (value: string) => value.replace(/\D/g, '');

export const CompanyFormSchema = zod.object({
  name: zod.string().min(1, 'This field cannot be empty'),
  industry: zod.string().optional(),
  country: zod.string().optional(),
  state: zod.string().optional(),
  city: zod.string().optional(),

  // contact details
  contact_name: zod.string().optional(),
  contact_email: zod.string().optional(),
  contact_phone: zod
    .string()
    .transform((value) => stripNonNumeric(value ?? ''))
    .refine((value) => value.length <= 15, {
      message: 'Phone number cannot have more than 15 digits',
    }),

  // configuration details
  subscription_type: zod.enum(['Annual', 'Monthly']),
  max_vehicles: zod.number().positive().optional(),
  max_drivers: zod.number().positive().optional(),
  max_routes: zod.number().positive().optional(),
  has_support_access: zod.boolean().optional(),
  active: zod.boolean(),
});

export type CompanySchemaValues = zod.infer<typeof CompanyFormSchema>;
