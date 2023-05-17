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
import {
  EmailOutlined,
  Key,
  Person2Outlined,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { btnStyle, inputSX } from '../../styles';
import { useCrudAction } from 'lib/comms_v2/nonGetActions';
import { compileSignupAction } from '../../actionCreators';
import { colorPalette } from 'lib/constants';
import { toast } from 'react-toastify';

export const SignupForm = () => {
  const [signingUp, setSigningUp] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // TODO: Change this to signup
  const registerUser = useCrudAction(compileSignupAction);

  const onSignupClicked = (
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    password1: string,
    password2: string
  ) => {
    setSigningUp(true);
    setErrors({});
    registerUser(username, firstName, lastName, email, password1, password2)
      .then(() => {
        navigate('/auth/login');
      })
      .catch((errors) => {
        toast.error(errors.detail ? `Error: ${errors.detail}` : 'Problem Registering User');
        setErrors(errors);
      })
      .finally(() => {
        setSigningUp(false);
      });
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      password1: '',
      password2: '',
    },
    onSubmit: (values) => {
      onSignupClicked(
        values.username,
        values.firstName,
        values.lastName,
        values.email,
        values.password1,
        values.password2
      );
    },
  });

  return (
    <Grid
      align="center"
      sx={{
        width: '95%',
        maxWidth: '500px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Typography variant={'h2'} sx={{ mb: 4 }}>
        Register
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <TextField
          value={formik.values.firstName}
          onChange={formik.handleChange}
          id="firstName"
          name="firstName"
          placeholder="John"
          helperText={errors?.firstName}
          FormHelperTextProps={{ sx: { color: 'red' } }}
          sx={inputSX}
          label={'First Name'}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person2Outlined />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          value={formik.values.lastName}
          onChange={formik.handleChange}
          id="lastName"
          name="lastName"
          placeholder="Doe"
          helperText={errors?.lastName}
          FormHelperTextProps={{ sx: { color: 'red' } }}
          sx={inputSX}
          label={'Last Name'}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person2Outlined />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          value={formik.values.username}
          onChange={formik.handleChange}
          id="username"
          name="username"
          placeholder="Enter username"
          helperText={errors?.username}
          FormHelperTextProps={{ sx: { color: 'red' } }}
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
          value={formik.values.email}
          onChange={formik.handleChange}
          id="email"
          name="email"
          placeholder="abc@xyz.com"
          helperText={errors?.email}
          FormHelperTextProps={{ sx: { color: 'red' } }}
          sx={inputSX}
          label={'Email Address'}
          type={'email'}
          fullWidth
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailOutlined />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          value={formik.values.password1}
          onChange={formik.handleChange}
          id="password1"
          name="password1"
          placeholder="Enter password"
          helperText={errors?.password1}
          FormHelperTextProps={{ sx: { color: 'red' } }}
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
        <TextField
          value={formik.values.password2}
          onChange={formik.handleChange}
          id="password2"
          name="password2"
          placeholder="Enter password"
          helperText={errors?.password2}
          FormHelperTextProps={{ sx: { color: 'red' } }}
          label={'Confirm Password'}
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
          }}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{ ...btnStyle, '&:hover': { background: colorPalette.lightPink } }}
          fullWidth
        >
          {signingUp ? <CircularProgress size={22} /> : <Typography>Register</Typography>}
        </Button>
      </form>
      <Grid align="center">
        <Box>
          <Typography>
            Already have an account? <br />
            <LinkMUI
              component={Link}
              to={'/auth/login'}
              variant={'body2'}
              sx={{
                textDecoration: 'none',
                fontWeight: '800',
                cursor: 'pointer',
              }}
            >
              Login Here
            </LinkMUI>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};
