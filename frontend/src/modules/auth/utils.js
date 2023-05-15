//@flow
import type { UserType } from './typedefs';

export const isSuperuserOrAdmin = (user: UserType) => {
  return user?.groupsDetail.id === 1 || user?.isSuperuser;
};
