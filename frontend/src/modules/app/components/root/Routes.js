import React from 'react';
import { BrowserRouter, Route, Routes as ReactRouterRoutes } from 'react-router-dom';
import ModalSwitch from './ModalSwitch';

const Routes = () => (
  <BrowserRouter>
    <ReactRouterRoutes>
      <Route path={'/*'} element={<ModalSwitch />} />
    </ReactRouterRoutes>
  </BrowserRouter>
);

export default Routes;
