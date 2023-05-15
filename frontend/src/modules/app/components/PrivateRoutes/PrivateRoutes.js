//@flow
import React, { useMemo } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import * as loadables from 'lib/loadables';
import storageService from 'lib/storageService';

const PrivateRoutes = () => {
  const location = useLocation();
  const token = storageService.get('token');

  return (
    <>
      <Routes location={location}>
        <Route path={'/*'} element={<loadables.LoadableDashboardModuleTemplateWithRoutes />} />
      </Routes>
    </>
  );
};

export default PrivateRoutes;
