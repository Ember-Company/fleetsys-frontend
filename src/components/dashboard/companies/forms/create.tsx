'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import MultiStepForm, { MultiStepFormConfig } from '@/components/shared/form/multi-step-form';

import CompanyDetails from './company-details';
import CompanySubmit from './company-submit';
import ConfigurationDetails from './configuration-details';
import ContactDetails from './contact-details';
import { CompanyFormSchema, CompanySchemaValues } from './schemas';

const formSteps: MultiStepFormConfig<CompanySchemaValues> = {
  0: {
    title: 'Basic Details',
    component: CompanyDetails,
  },
  1: {
    title: 'Contact Details',
    component: ContactDetails,
  },
  2: {
    title: 'Configuration',
    component: ConfigurationDetails,
  },
  3: {
    title: 'Review',
    component: CompanySubmit,
    isEnd: true,
  },
};

const defaultValues = {
  name: '',
  industry: '',
  country: '',
  state: '',
  city: '',
  contact_phone: '',
  contact_email: '',
  contact_name: '',
  max_drivers: 10,
  max_routes: 10,
  max_vehicles: 15,
  subscription_type: 'Monthly',
  active: false,
  has_support_access: true,
} satisfies CompanySchemaValues;

export default function CreateCompanyForm() {
  return (
    <MultiStepForm<CompanySchemaValues>
      configProps={formSteps}
      defaultValues={defaultValues}
      resolver={zodResolver(CompanyFormSchema)}
    />
  );
}
