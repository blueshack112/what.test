//@flow
import type { CrudAction } from 'lib/comms_v2/typeDefs';
import { createRecord } from 'lib/comms_v2/actionCreators';

export const compileLoginAction = (username: string, password: string): CrudAction =>
  createRecord('token', 'token/', { username, password });
