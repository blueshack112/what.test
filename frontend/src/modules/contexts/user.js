import { createContext } from 'react';
import type { UserSWREntity, UserType } from '../auth/typedefs';

export const UserContext: UserSWREntity = createContext({ data: undefined });
