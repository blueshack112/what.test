export type LoginResponse = {
  access: string,
  refresh: string,
};

export type ActiveSearchAndSelectionType = {
  id: number,
  searchQuery: string,
  selectedProducts: number[],
};

export type UserType = {
  id: number,
  username: string,
  firstName: string,
  lastName: string,
  email: string,
  isSuperuser: boolean,
  activeSearchAndSelection: ActiveSearchAndSelectionType,
};

export type UserSWREntity = {
  data: UserType,
  isError: boolean,
  isLoading: boolean,
  isSWR: boolean,
  mutate: () => void,
};
