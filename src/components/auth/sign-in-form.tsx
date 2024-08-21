'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { EyeSlash as EyeSlashIcon } from '@phosphor-icons/react/dist/ssr/EyeSlash';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import { paths } from '@/paths';
import { authClient } from '@/lib/api/auth/client';
import { logger } from '@/lib/default-logger';
import useMounted from '@/hooks/use-mounted';

const schema = zod.object({
  email: zod.string().min(1, { message: 'Email is required' }).email(),
  password: zod.string().min(1, { message: 'Password is required' }),
});

type Values = zod.infer<typeof schema>;
const defaultValues = { email: '', password: '' } satisfies Values;

export function SignInForm(): React.JSX.Element | null {
  const mounted = useMounted();

  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [isPending, setIsPending] = React.useState<boolean>(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  React.useEffect(() => {
    void authClient.getSession().then((res) => {
      logger.warn('session fetched');
      logger.warn(res);
    });
  }, []);

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      setIsPending(true);

      try {
        const data = await authClient.login(values);
        logger.debug(data?.user);

        if (!data?.user) {
          setError('root', { type: 'server', message: 'An error occurred during login' });
          setIsPending(false);
          return;
        }

        router.refresh();
      } catch (error) {
        setError('root', { type: 'server', message: 'An error occurred during login' });
        return;
      } finally {
        setIsPending(false);
      }
    },
    [router, setError, setIsPending]
  );

  if (!mounted) return null;

  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h4">Sign in</Typography>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <FormControl error={Boolean(errors.email)}>
                <InputLabel>Email address</InputLabel>
                <OutlinedInput {...field} label="Email address" type="email" />
                <FormHelperText>{errors?.email?.message ?? null}</FormHelperText>
                {/* {errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null} */}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <FormControl error={Boolean(errors.password)}>
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                  {...field}
                  endAdornment={
                    showPassword ? (
                      <EyeIcon
                        cursor="pointer"
                        fontSize="var(--icon-fontSize-md)"
                        onClick={(): void => {
                          setShowPassword(false);
                        }}
                      />
                    ) : (
                      <EyeSlashIcon
                        cursor="pointer"
                        fontSize="var(--icon-fontSize-md)"
                        onClick={(): void => {
                          setShowPassword(true);
                        }}
                      />
                    )
                  }
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                />
                <FormHelperText>{errors?.password?.message ?? null}</FormHelperText>
                {/* {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null} */}
              </FormControl>
            )}
          />
          {/* <div> */}
          <Link component={RouterLink} href={paths.auth.resetPassword} variant="subtitle2" sx={{ display: 'block' }}>
            Forgot password?
          </Link>
          {/* </div> */}
          {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
          <Button disabled={isPending} type="submit" variant="contained">
            Sign in
          </Button>
        </Stack>
      </form>
      <Alert color="warning">
        Use{' '}
        <Typography component="span" sx={{ fontWeight: 700 }} variant="inherit">
          master@email.com
        </Typography>{' '}
        with password{' '}
        <Typography component="span" sx={{ fontWeight: 700 }} variant="inherit">
          password
        </Typography>
      </Alert>
    </Stack>
  );
}
