import React from 'react';
import { Grid } from '@mui/material';
import { SignupForm } from './SignupForm';

const SignupScreen = () => {
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
          <SignupForm />
        </Grid>
      </Grid>
    </div>
  );
};

export default SignupScreen;
