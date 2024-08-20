import { type ApiGroup } from '@/types/api';

const CoreApiRoutes = {
  auth: {
    login: {
      method: 'post',
      path: 'api/login',
    },
    logout: {
      method: 'post',
      path: 'api/logout',
    },
    csrfCookie: {
      method: 'get',
      path: 'sanctum/csrf-cookie',
    },
  },
  vehicleStatus: {
    findAll: {
      method: 'get',
      path: '/api/vehicle-status',
    },
    create: {
      method: 'post',
      path: '/api/vehicle-status',
    },
  },
  user: {
    showUser: {
      method: 'get',
      path: 'api/user',
    },
  },
  vehicles: {
    findAll: {
      method: 'get',
      path: 'api/vehicles',
    },
    createVehicle: {
      method: 'post',
      path: 'api/vehicles',
    },
  },
} as const satisfies ApiGroup;

export default CoreApiRoutes;
