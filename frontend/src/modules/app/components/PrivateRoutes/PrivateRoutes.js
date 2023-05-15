//@flow
import React, { useMemo } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import * as loadables from 'lib/loadables';
import { DecodedJwtTokenContext } from 'lib/DecodedJWTTokenContext/DecodedJWTTokenContext';
import storageService from 'lib/storageService';
import jwtDecode from 'jwt-decode';

const PrivateRoutes = () => {
  const location = useLocation();
  const token = storageService.get('token');
  const tokenDecoded = useMemo(() => (token ? jwtDecode(token) : null), [token]);
  return (
    <>
      <DecodedJwtTokenContext.Provider value={tokenDecoded}>
        <Routes location={location}>
          <Route path={'/*'} element={<loadables.LoadableDashboardModuleTemplateWithRoutes />} />
        </Routes>
      </DecodedJwtTokenContext.Provider>
    </>
  );
};

export default PrivateRoutes;
