//@flow
import { createContext } from 'react';
import type { UserSWREntity } from '../auth/typedefs';

export const UserContext: UserSWREntity = createContext({ data: undefined });
