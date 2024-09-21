'use client';

import React, { useCallback, useEffect, useMemo } from 'react';
// import { useRouter } from 'next/router';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { FieldValues } from 'react-hook-form';

import { Profile, UpdateUserPayload, User } from '@/types/user';
import { paths } from '@/paths';
import { logger } from '@/lib/default-logger';
import { useGetTargetUser, useUpdateUser } from '@/hooks/queries';
import useAlertMessage from '@/hooks/use-alert-message';
import { useTransformData } from '@/hooks/use-transform';
import { useUser } from '@/hooks/use-user';
import { FormGrid } from '@/components/shared/form';
import { AccountFields } from '@/components/shared/form/fields';
import ProfileFields from '@/components/shared/form/fields/profile-fields';
import Form from '@/components/shared/form/form';

import EditForm from './edit-form';
import { AccountFormSchema, AccountValues, defaultAccountValues, EditAccountValues } from './schemas';

type Props = {};

export default function UpdateCurrentAccountForm({}: Props) {
  const { user } = useUser();
  const { mutate, isPending } = useUpdateUser(user?.id);
  const { AlertMessage, updateAlertMessage } = useAlertMessage();

  const userData = useTransformData<User>({
    data: user,
    include: {
      email: true,
      name: true,
      phone_number: true,
      role: true,
    },
  });

  const userProfile = useTransformData<Profile>({
    data: user?.profile,
    include: {
      industry: true,
      city: true,
      country: true,
      postal_code: true,
      region: true,
    },
  });

  useEffect(() => {
    logger.debug(userData);
  }, [userData, logger]);

  const handleSubmit = useCallback(
    (values: FieldValues) => {
      logger.debug(values);
      mutate(values as EditAccountValues, {
        onSuccess: () => {
          logger.warn('success');
          updateAlertMessage({
            isError: false,
            text: 'Account Updated Successfully',
          });
        },
        onError: (err) => {
          updateAlertMessage({
            isError: true,
            text: err.message,
          });
        },
      });
    },
    [mutate]
  );

  return (
    <Card>
      <Form<EditAccountValues>
        variant="edit"
        defaultValues={{ ...userData, user_meta: userProfile }}
        resolver={zodResolver(AccountFormSchema)}
        submitHandler={handleSubmit}
        loading={isPending}
      >
        <FormGrid title="" fullWidth fullWidthPadding={5}>
          <AccountFields disableFields={{ role: true }} />
          <ProfileFields />

          <Grid size={12}>
            <AlertMessage />
          </Grid>
          <Grid size={12}>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Grid>
        </FormGrid>
      </Form>
    </Card>
  );
}
