import { type ApiGroup } from '@/types/api';

const CoreApiRoutes = {
  auth: {
    register: {
      method: 'post',
      path: '/register',
    },
    login: {
      method: 'post',
      path: '/login',
    },
    logout: {
      method: 'post',
      path: '/logout',
    },
  },
  user: {
    showUser: {
      method: 'get',
      path: '/user',
    },
  },
} satisfies ApiGroup;

export default CoreApiRoutes;
