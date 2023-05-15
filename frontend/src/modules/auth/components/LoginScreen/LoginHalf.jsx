//@flow
import React from 'react';
import { useFormik } from 'formik';
import { logIn } from '../../workflow';
import { useSWRConfig } from 'swr';

import {
  Grid,
  TextField,
  Button,
  Typography,
  Link as LinkMUI,
  InputAdornment,
  Box,
} from '@mui/material';

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Person2Outlined, Key, Visibility, VisibilityOff } from '@mui/icons-material';

import { useState } from 'react';

//style import
import { Link, useNavigate } from 'react-router-dom';
import {
  paperStyle,
  headingStyle,
  formControlStyle,
  remembermeStyle,
  textFieldInputstyle,
  formControlStyle2,
  forgetStyle,
  btnStyle,
} from './styles';
import { useGlobalAction } from 'lib/comms_v2/nonGetActions';
import { compileLoginAction } from '../../actionCreators';

export const LoginHalf = () => {
  // TODO: Error logging on the form
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  // onLogin function & swr cache
  const { cache: swrCache } = useSWRConfig();
  const login = useGlobalAction(compileLoginAction);
  const onLogin = (username: string, password: string) => {
    login(username, password).then((response) => {
      logIn(response, swrCache, navigate);
    });
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },

    onSubmit: (values) => {
      onLogin(values.username, values.password);
    },
  });

  return (
    <Grid
      align="center"
      // container
      style={{ ...paperStyle }}
      // justifyContent={"center"}
      // alignItems={"center"}
    >
      <Grid align="center">
        <h2 style={headingStyle}>Sign in</h2>
      </Grid>

      <form onSubmit={formik.handleSubmit}>
        <TextField
          value={formik.values.username}
          onChange={formik.handleChange}
          id="username"
          name="username"
          placeholder="Enter username"
          style={textFieldInputstyle}
          label={'Username'}
          fullWidth
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person2Outlined
                  sx={{
                    color: 'white',
                  }}
                />
              </InputAdornment>
            ),
            sx: { color: 'white' },
          }}
          InputLabelProps={{
            sx: { color: 'white', background: 'black', '&.Mui-focused': { color: 'white' } },
          }}
        />

        <TextField
          value={formik.values.password}
          onChange={formik.handleChange}
          id="password"
          name="password"
          placeholder="Enter password"
          label={'Password'}
          style={textFieldInputstyle}
          type={showPassword ? 'text' : 'password'}
          fullWidth
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Key sx={{ color: 'white' }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                {' '}
                {showPassword ? (
                  <Visibility
                    sx={{ color: 'white', cursor: 'pointer' }}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <VisibilityOff
                    sx={{ color: 'white', cursor: 'pointer' }}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </InputAdornment>
            ),
            sx: { color: 'white' },
          }}
          InputLabelProps={{
            sx: { color: 'white', background: 'black', '&.Mui-focused': { color: 'white' } },
          }}
        />

        <Box display="flex" justifyContent="space-between">
          <FormControlLabel
            style={formControlStyle2}
            control={
              <Checkbox
                sx={{
                  color: 'white',
                }}
                name="checkedB"
                color="primary"
              />
            }
            label={<Typography style={remembermeStyle}>Remember me</Typography>}
          />
          <Typography style={forgetStyle}>
            <LinkMUI
              href="#"
              sx={{
                color: 'white',
                textDecoration: 'none',
              }}
            >
              Forgot password ?
            </LinkMUI>
          </Typography>
        </Box>
        <Button type="submit" variant="contained" style={btnStyle} fullWidth>
          Sign in
        </Button>
      </form>
      <Grid align="center">
        <Box>
          <Typography style={formControlStyle}>
            {' '}
            Don&apos;t have an account? <br />
            <LinkMUI
              component={Link}
              to={'/auth/signup'}
              // paddingLeft={"30px"}
              variant={'body2'}
              sx={{
                color: 'white',
                textDecoration: 'none',
                fontWeight: '800',
                lineHeight: '24px',
                cursor: 'pointer',
              }}
            >
              Create Account
            </LinkMUI>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};
