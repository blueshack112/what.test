//@flow
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';

const ModuleRoutes = () => {
  const location = useLocation();
  return (
    <>
      <Grid container alignItems="stretch">
        <Grid>
          <Routes location={location}>
            <Route path={''} element={<Typography />} />
          </Routes>
        </Grid>
      </Grid>
    </>
  );
};

export default ModuleRoutes;
