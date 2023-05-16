export type LoginResponse = {
  access: string,
  refresh: string,
};

export type UserType = {
  id: number,
  username: string,
  firstName: string,
  lastName: string,
  email: string,
  isSuperuser: boolean,
};

export type UserSWREntity = {
  data: UserType,
  isError: boolean,
  isLoading: boolean,
  isSWR: boolean,
  mutate: () => void,
};
