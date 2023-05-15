//@flow
import { apiClient } from 'store';
import type { CrudAction } from './typeDefs';

export const apiCaller = (url, action: CrudAction) => {
  if (action.fakeCall) return {};

  const { method, path, params, data, fetchConfig } = action.payload;
  return apiClient[method](path, { params, data, fetchConfig });
};
