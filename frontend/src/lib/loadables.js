import React from 'react';

// TODO: -hassan: Move all loadables to their corresponding modules

const makeLoadable = React.lazy;

export const LoadableLoginScreen = makeLoadable(
  () => import('modules/auth/components/LoginScreen')
);
