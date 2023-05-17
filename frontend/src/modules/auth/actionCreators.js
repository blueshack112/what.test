//@flow
import type { CrudAction } from 'lib/comms_v2/typeDefs';
import { createRecord, fetchRecord, updateRecord } from 'lib/comms_v2/actionCreators';

export const compileLoginAction = (username: string, password: string): CrudAction =>
  createRecord('token', 'token/', { username, password });

export const compileSignupAction = (
  username: string,
  firstName: string,
  lastName: string,
  email: string,
  password1: string,
  password2: string
): CrudAction =>
  createRecord('SignUp', 'users/', { username, firstName, lastName, email, password1, password2 });

export const compileGetCurrentUserAction = (userID: number): CrudAction =>
  fetchRecord('CurrentUser', userID, 'users/get-current/');

export const compilePatchActiveSelectionDataAction = (patchID: number, data): CrudAction =>
  updateRecord('CurrentUser', patchID, `users/search-and-selection/${patchID}/`, data);
