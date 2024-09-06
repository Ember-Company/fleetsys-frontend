import { type ApiGroup } from '@/types/api';

const CoreApiRoutes = {
  auth: {
    register: {
      method: 'post',
      path: 'api/register?company=',
    },
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
    find: {
      method: 'get',
      path: 'api/vehicle-status',
      routeById: (id?: string) => ({
        findOne: {
          method: 'get',
          path: `api/vehicle-status/${id ?? ''}`,
        },
      }),
    },
    create: {
      method: 'post',
      path: 'api/vehicle-status',
      routeById: (id?: string) => ({
        update: {
          method: 'put',
          path: `api/vehicle-status/${id ?? ''}`,
        },
        remove: {
          method: 'delete',
          path: `api/vehicle-status/${id ?? ''}`,
        },
      }),
    },
  },
  vehicleType: {
    find: {
      method: 'get',
      path: 'api/vehicle-types',
      routeById: (id?: string) => ({
        findOne: {
          method: 'get',
          path: `api/vehicle-types/${id ?? ''}`,
        },
      }),
    },
    create: {
      method: 'post',
      path: 'api/vehicle-types',
      routeById: (id?: string) => ({
        update: {
          method: 'put',
          path: `api/vehicle-types/${id ?? ''}`,
        },
        remove: {
          method: 'delete',
          path: `api/vehicle-types/${id ?? ''}`,
        },
      }),
    },
  },
  user: {
    showUser: {
      method: 'get',
      path: 'api/user',
    },
    findAll: {
      method: 'get',
      path: 'api/users',
      routeById: (id?: string) => ({
        findOne: {
          method: 'get',
          path: `/api/users/${id ?? ''}`,
        },
      }),
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
