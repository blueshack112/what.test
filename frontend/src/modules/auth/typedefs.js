//@flow
export type LoginResponse = {
  access: string,
  refresh: string,
};

export type GroupDetailType = {
  id: number,
  name: string,
  permissions: [],
};

export type UserType = {
  id: number,
  lastLogin: string,
  username: string,
  firstName: string,
  lastName: string,
  email: string,
  company: string,
  position: string,
  groups: number,
  groupsDetail: GroupDetailType,
  dateJoined: string,
  isSuperuser: boolean,
};
export type UserSWREntity = {
  data: UserType,
  isError: boolean,
  isLoading: boolean,
  isSWR: boolean,
  mutate: () => void,
};

export type UsersSWREntity = {
  data: UserType[],
  isError: boolean,
  isLoading: boolean,
  isSWR: boolean,
  mutate: () => void,
};
