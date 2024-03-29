//@flow

import storageService from 'lib/storageService';
import { apiClient } from 'store';
import { LoginResponse } from './typedefs';
import { cookiesUsed } from '../../lib/constants';

export const setToken = (loginResponse: LoginResponse, swrCache) => {
  if (!loginResponse || !loginResponse.access) return;

  storageService.set('token', loginResponse.access);
  storageService.set('refresh', loginResponse.access);

  apiClient.setToken(loginResponse.access);
  swrCache && swrCache.clear();
};

export const logIn = (loginResponse: LoginResponse, swrCache, navigate: (*) => void) => {
  setToken(loginResponse, swrCache);
  swrCache && swrCache.clear();
  navigate('/');
};

export const removeToken = () => {
  storageService.remove('token');
  storageService.remove('refresh');
  cookiesUsed.map((key) => storageService.remove(key));
  apiClient.setToken();
};

export const logOut = (navigate: (*) => void, swrCache: *) => {
  removeToken();
  swrCache && swrCache.clear();
  navigate('/auth/login');
};
