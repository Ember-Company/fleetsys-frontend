import React, { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import { SystemCssProperties } from '@mui/system';
import {
  DefaultValues,
  FieldValue,
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
  UseFormProps,
} from 'react-hook-form';

import { FormContentProps, FormVariant, RootFormProps } from '@/types/forms';
import { logger } from '@/lib/default-logger';

import { FormGrid } from './form-grid';
import { ResetFormProps } from './reset-form';

type FormConfigType = Record<FormVariant, { title: string; component: React.ComponentType }>;

interface RootFormComponentProps<TSchema extends FieldValues>
  extends Omit<RootFormProps, 'targetId' | 'defaultValues'> {
  defaultValues?: TSchema | {};
  configProps?: FormConfigType;
  resolver: UseFormProps<TSchema>['resolver'];
  asChild?: boolean;
  containerStyle?: SystemCssProperties;
  ResetComponent?: React.ComponentType<ResetFormProps>;
  submitHandler?: SubmitHandler<FieldValues>;
  loading?: boolean;
  exclude?: (keyof TSchema)[];
  // FormContent: React.ComponentType;
}

function sampleCreate(): React.JSX.Element {
  return (
    <>
      <input placeholder="name" />
      <input placeholder="last name" />
    </>
  );
}

function sampleEdit(): React.JSX.Element {
  return (
    <>
      <input placeholder="name" />
      <input placeholder="last name" />
    </>
  );
}

const form = {
  create: {
    title: 'Create',
    component: sampleCreate,
  },
  edit: {
    title: 'Edit',
    component: sampleEdit,
  },
} satisfies FormConfigType;

export default function Form<S extends FieldValues>({
  configProps,
  defaultValues = {},
  resolver,
  asChild = false,
  containerStyle = {},
  ResetComponent,
  submitHandler,
  exclude = [],
  loading,
  children,
}: RootFormComponentProps<S> & PropsWithChildren) {
  const methods = useForm<S>({
    defaultValues: defaultValues as DefaultValues<S>,
    resolver,
  });
  const {
    formState: { errors },
  } = methods;

  useEffect(() => {
    logger.debug(errors);
  }, [errors]);

  // noonce
  const fallbackHandler = () => {};

  const handleReset = (): void => {
    methods.reset();
  };

  if (ResetComponent && methods.formState.isSubmitSuccessful) {
    return (
      <Stack>
        <ResetComponent handleReset={handleReset} />
      </Stack>
    );
  }

  return (
    <form onSubmit={methods.handleSubmit(submitHandler ?? fallbackHandler)}>
      <FormProvider {...methods}>{children}</FormProvider>
    </form>
  );
}
