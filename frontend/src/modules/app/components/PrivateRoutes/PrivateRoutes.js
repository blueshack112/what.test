//@flow
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import * as loadables from 'lib/loadables';
import Navbar from '../Navbar';

const PrivateRoutes = () => {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <Routes location={location}>
        <Route path={'/*'} element={<loadables.LoadableProductModuleRoutes />} />
      </Routes>
    </>
  );
};

export default PrivateRoutes;
