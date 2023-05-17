import React, { Suspense, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import * as loadables from 'lib/loadables';

import storageService from 'lib/storageService';
import { CircularProgress } from '@mui/material';

const ModalSwitch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = storageService.get('token');
  const isAuthenticated = !!token;

  useEffect(() => {
    isAuthenticated && location.pathname.startsWith('/auth/') && navigate('/');
    !isAuthenticated && !location.pathname.startsWith('/auth/') && navigate('/auth/login');
  }, [location.pathname]);
  return (
    <Suspense fallback={<CircularProgress size={100} />}>
      {/* TODO: Move auth routes to auth module />*/}
      <Routes location={location}>
        <Route path="/auth/*">
          <Route exact path="login" element={<loadables.LoadableLoginScreen />} />
          <Route exact path="signup" element={<loadables.LoadableSignupScreen />} />
        </Route>
        <Route
          path={'/*'}
          element={<loadables.LoadablePrivateRoutes isAuthenticated={isAuthenticated} />}
        />
        {/* TODO: Add not found route: <Route component={loadables.LoadableNotFound} />*/}
      </Routes>
    </Suspense>
  );
};

export default ModalSwitch;
