//@flow
import { useCallback } from 'react';
import { apiCaller } from './apiCaller';
import type { CrudAction } from './typeDefs';

export const useCrudAction = <T>(actionCreator: (*) => CrudAction<T>): Promise<any> =>
  useCallback(
    (...args) => {
      const action = actionCreator(...args);
      return apiCaller(action);
    },
    [actionCreator]
  );
