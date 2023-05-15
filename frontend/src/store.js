import storageService from 'lib/storageService';
import ApiClient from 'lib/apiClient';

export const apiClient = new ApiClient({
  basePath: `${process.env.REACT_APP_API_ROOT}/v1/api/`,
  fetchConfig: {
    headers: {
      Accept: 'application/json',
      'Access-Control-Allow-Methods': '*',
      // "Access-Control-Allow-Origin": "true",
      // mode: "no-cors",
    },
  },
  methods: ['get', 'post', 'put', 'patch', 'delete', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
});

apiClient.setToken(storageService.get('token'));
