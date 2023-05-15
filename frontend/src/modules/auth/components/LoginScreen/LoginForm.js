//@flow
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useSWRConfig } from 'swr';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  InputAdornment,
  Link as LinkMUI,
  TextField,
  Typography,
} from '@mui/material';
import { Key, Person2Outlined, Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { btnStyle, inputSX } from './styles';
import { useGlobalAction } from 'lib/comms_v2/nonGetActions';
import { compileLoginAction } from '../../actionCreators';
import { logIn } from '../../workflows';
import { colorPalette } from 'lib/constants';
import { toast } from 'react-toastify';

export const LoginForm = () => {
  const [loggingIn, setLoggingIn] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { cache: swrCache } = useSWRConfig();
  const getJWToken = useGlobalAction(compileLoginAction);

  const onLoginClicked = (username: string, password: string) => {
    setLoggingIn(true);
    setErrors({});
    getJWToken(username, password)
      .then((response) => {
        logIn(response, swrCache, navigate);
      })
      .catch((errors) => {
        toast.error(errors.detail ? `Error: ${errors.detail}` : 'Problem Logging In');
        setErrors(errors);
      })
      .finally(() => {
        setLoggingIn(false);
      });
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },

    onSubmit: (values) => {
      onLoginClicked(values.username, values.password);
    },
  });

  return (
    <Grid
      align="center"
      sx={{
        width: '500px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Typography variant={'h2'} sx={{ mb: 4 }}>
        Sign in
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <TextField
          value={formik.values.username}
          onChange={formik.handleChange}
          id="username"
          name="username"
          placeholder="Enter username"
          helperText={errors?.username}
          sx={inputSX}
          label={'Username'}
          fullWidth
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person2Outlined />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          value={formik.values.password}
          onChange={formik.handleChange}
          id="password"
          name="password"
          placeholder="Enter password"
          helperText={errors?.password}
          label={'Password'}
          sx={inputSX}
          type={showPassword ? 'text' : 'password'}
          fullWidth
          required
          InputProps={{
            sx: { paddingX: 2 },
            startAdornment: (
              <InputAdornment position="start">
                <Key />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                {' '}
                {showPassword ? (
                  <Visibility
                    sx={{ cursor: 'pointer' }}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <VisibilityOff
                    sx={{ cursor: 'pointer' }}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </InputAdornment>
            ),
          }}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{ ...btnStyle, '&:hover': { background: colorPalette.lightPink } }}
          fullWidth
        >
          {loggingIn ? <CircularProgress size={22} /> : <Typography>Sign in</Typography>}
        </Button>
      </form>
      <Grid align="center">
        <Box>
          <Typography>
            Don't have an account? <br />
            <LinkMUI
              component={Link}
              to={'/auth/signup'}
              variant={'body2'}
              sx={{
                textDecoration: 'none',
                fontWeight: '800',
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
