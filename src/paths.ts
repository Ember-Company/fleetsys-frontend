export const paths = {
  home: '/',
  auth: { signIn: '/auth/sign-in', resetPassword: '/auth/reset-password' },
  dashboard: {
    overview: '/dashboard/',
    account: '/dashboard/account/',
    vehicles: '/dashboard/vehicles/',
    team: '/dashboard/teams/',
    createEmployee: '/dashboard/teams/create/',
    integrations: '/dashboard/tracking/',
    settings: '/dashboard/settings/',
    clients: '/dashboard/clients/',
  },
  errors: { notFound: '/errors/not-found' },
} as const;
