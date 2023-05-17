//@flow
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import * as loadables from 'lib/loadables';
import Navbar from '../Navbar';
import { UserContext } from '../../../contexts/user';
import { useGlobalSWR } from 'lib/comms_v2/useGlobalSWR';
import * as authActionCreators from '../../../auth/actionCreators';

const PrivateRoutes = () => {
  const location = useLocation();

  return (
    <UserContext.Provider value={useGlobalSWR(authActionCreators.compileGetCurrentUserAction())}>
      <Navbar />
      <Routes location={location}>
        <Route path={'/*'} element={<loadables.LoadableProductModuleRoutes />} />
      </Routes>
    </UserContext.Provider>
  );
};

export default PrivateRoutes;
