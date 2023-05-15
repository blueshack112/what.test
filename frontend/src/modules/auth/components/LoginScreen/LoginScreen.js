import React from 'react';
import { Grid } from '@mui/material';
import { LoginHalf } from './LoginHalf';
import { LogoHalf } from './LogoHalf';

//style import
import { gridStyle, SigninStyle } from './styles';

const LoginScreen = () => {
  return (
    <div>
      <Grid container spacing={2} alignItems="center" style={gridStyle}>
        <Grid item xs={6} justifyContent="center">
          <LogoHalf />
        </Grid>
        <Grid item xs={6} style={SigninStyle} align="center">
          <LoginHalf />
        </Grid>
      </Grid>
    </div>
  );
};

export default LoginScreen;
