import { type ApiRouteList } from '@/types/api';

const CoreApiRouteList = {
  register: {
    method: 'post',
    path: '/register',
  },
} satisfies ApiRouteList;

export default CoreApiRouteList;
