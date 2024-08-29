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
      method: 'head',
      path: 'sanctum/csrf-cookie',
    },
  },
  vehicleStatus: {
    listVehicleStatus: {
      method: 'get',
      path: '/api/vehicle-status',
    },
    createVehicleStatus: {
      method: 'post',
      path: '/api/vehicle-status',
    },
  },
  vehicleType: {
    find: {
      method: 'get',
      path: '/api/vehicle-types',
      routeById: (id?: string) => ({
        findOne: {
          method: 'get',
          path: `/api/vehicle-types/${id ?? ''}`,
        },
      }),
    },
    create: {
      method: 'post',
      path: '/api/vehicle-types',
      routeById: (id?: string) => ({
        update: {
          method: 'put',
          path: `/api/vehicle-types/${id ?? ''}`,
        },
        remove: {
          method: 'delete',
          path: `/api/vehicle-types/${id ?? ''}`,
        },
      }),
    },
  },
  user: {
    showUser: {
      method: 'get',
      path: 'api/user',
    },
  },
  vehicles: {
    listVehicles: {
      method: 'get',
      path: 'api/vehicles',
    },
    createVehicle: {
      method: 'post',
      path: 'api/vehicles',
    },
  },
  companies: {
    listCompanies: {
      method: 'get',
      path: 'api/companies',
    },
    createCompany: {
      method: 'post',
      path: 'api/companies',
    },
  },
} as const satisfies ApiGroup;

export default CoreApiRoutes;
