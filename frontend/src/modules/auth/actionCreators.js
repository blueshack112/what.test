//@flow
import type { CrudAction } from 'lib/comms_v2/typeDefs';
import {
  createRecord,
  fetchCollection,
  fetchRecord,
  updateRecord,
} from 'lib/comms_v2/actionCreators';

export const compileLoginAction = (username: string, password: string): CrudAction =>
  createRecord('token', 'token/', { username, password });

export const compileSignupAction = (
  email: string,
  username: string,
  fullname: string,
  password1: string,
  password2: string,
  company: string,
  position: string
): CrudAction =>
  createRecord('signup', 'user/register/', {
    email,
    username,
    fullname,
    password1,
    password2,
    company,
    position,
  });

export const compileGetUserAction = (userID: number) => {
  return fetchRecord(`User`, userID, `user/${userID}/`);
};

//TODO: maybe shift User actions to User/actionCreators
export const compileListUsersAction = (): CrudAction => fetchCollection('Users', 'user/');

export const makeUserAdminAction = (userID: number): CrudAction =>
  updateRecord('MakeAdmin', userID, `user/${userID}/make_admin/`);

export const removeUserAdminAction = (userID: number): CrudAction =>
  updateRecord('RemoveAdmin', userID, `user/${userID}/demote_to_user/`);

export const getCurrentUserAction = (userID: number): CrudAction =>
  fetchRecord('CurrentUser', userID, 'user/get-current/');
