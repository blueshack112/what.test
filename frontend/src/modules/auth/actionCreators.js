//@flow
import type { CrudAction } from 'lib/comms_v2/typeDefs';
import { createRecord, fetchRecord } from 'lib/comms_v2/actionCreators';

export const compileLoginAction = (username: string, password: string): CrudAction =>
  createRecord('token', 'token/', { username, password });

export const compileGetCurrentUserAction = (userID: number): CrudAction =>
  fetchRecord('CurrentUser', userID, 'users/get-current/');
