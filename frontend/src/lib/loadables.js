import React from 'react';

// TODO: -hassan: Move all loadables to their corresponding modules

const makeLoadable = React.lazy;

export const LoadableLoginScreen = makeLoadable(
  () => import('modules/auth/components/LoginScreen')
);

/* Private Routes */
export const LoadablePrivateRoutes = makeLoadable(
  () => import('modules/app/components/PrivateRoutes')
);

export const LoadableProductModuleRoutes = makeLoadable(
  () => import('modules/product/components/ModuleRoutes')
);
