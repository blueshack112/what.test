import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ModalSwitch from './ModalSwitch';
import { Routes as ReactRouterRoutes } from 'react-router-dom';

const Routes = () => (
  <BrowserRouter>
    <ReactRouterRoutes>
      <Route path={'/*'} element={<ModalSwitch />} />
    </ReactRouterRoutes>
  </BrowserRouter>
);

export default Routes;
