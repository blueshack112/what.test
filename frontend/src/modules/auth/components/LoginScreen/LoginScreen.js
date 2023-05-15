import React from 'react';
import { Grid } from '@mui/material';
import { LoginForm } from './LoginForm';

const LoginScreen = () => {
  return (
    <div>
      <Grid
        container
        spacing={0}
        alignItems="center"
        justifyContent={'center'}
        sx={{ height: '100vh' }}
      >
        <Grid item align="center">
          <LoginForm />
        </Grid>
      </Grid>
    </div>
  );
};

export default LoginScreen;
