import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { MultiFormPropsContext } from '@/types/forms';
import { FormGrid } from '@/components/shared/form';

import { CompanySchemaValues } from './schemas';

export default function CompanySubmit({
  formData,
  handleBack,
  handleNext,
  updateFormState,
}: MultiFormPropsContext<CompanySchemaValues>): React.JSX.Element {
  const { register } = useFormContext<CompanySchemaValues>();

  return (
    <form>
      <FormGrid title="Company Submit"></FormGrid>
    </form>
  );
}
