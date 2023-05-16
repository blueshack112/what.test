//@flow
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import * as loadables from 'lib/loadables';

const ModuleRoutes = () => {
  const location = useLocation();
  return (
    <Routes location={location}>
      <Route path={''} element={<loadables.LoadableProductSearchScreen />} />
    </Routes>
  );
};

export default ModuleRoutes;
