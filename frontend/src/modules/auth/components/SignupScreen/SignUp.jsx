//@flow
import {
  Person2Outlined,
  EmailOutlined,
  PermIdentityOutlined,
  Key,
  KeyOutlined,
  Business,
  StarBorderOutlined,
} from '@mui/icons-material';
import {
  Box,
  Link as LinkMUI,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  TextField,
  InputAdornment,
  Button,
  Typography,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';

//styles import
import {
  paperStyle,
  headingStyle,
  TextField1style,
  EmailFieldStyle,
  btnStyle,
  formControlStyle,
} from './Styled';
import { useFormik } from 'formik';
import NavPaths from 'modules/app/NavPaths';
import { useGlobalAction } from 'lib/comms_v2/nonGetActions';
import { compileSignupAction } from '../../actionCreators';

export const SignUp = () => {
  const navigate = useNavigate();
  const signup = useGlobalAction(compileSignupAction);
  const onSignup = (
    email: string,
    username: string,
    fullname: string,
    password1: string,
    password2: string,
    company: string,
    position: string
  ) => {
    signup(email, username, fullname, password1, password2, company, position).then(() => {
      // TODO: Toast here as well
      navigate(NavPaths.dashboard);
    });
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      fullname: '',
      password1: '',
      password2: '',
      company: '',
      position: '',
    },

    onSubmit: (values) => {
      onSignup(
        values.email,
        values.username,
        values.fullname,
        values.password1,
        values.password2,
        values.company,
        values.position
      );
    },
  });

  return (
    <Box style={paperStyle} justifyContent="center">
      <Box display="flex" justifyContent="center" mt="30px" maxHeight="100vh">
        <List>
          <ListItem>
            <ListItemIcon>
              <svg
                width="52"
                height="52"
                viewBox="0 0 52 52"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_1018_6210)">
                  <path
                    d="M45.5 26C45.5 15.2344 36.7656 6.5 26 6.5V45.5C36.7656 45.5 45.5 36.7656 45.5 26ZM52 26C52 40.3609 40.3609 52 26 52C11.6391 52 0 40.3609 0 26C0 11.6391 11.6391 0 26 0C40.3609 0 52 11.6391 52 26Z"
                    fill="url(#paint0_linear_1018_6210)"
                  />
                </g>
                <defs>
                  <linearGradient
                    id="paint0_linear_1018_6210"
                    x1="26"
                    y1="0"
                    x2="26"
                    y2="52"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="white" />
                    <stop offset="0.0001" stopColor="white" />
                  </linearGradient>
                  <clipPath id="clip0_1018_6210">
                    <rect width="52" height="52" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </ListItemIcon>
            <ListItemText
              color="red"
              primary="Mal X"
              primaryTypographyProps={{
                margin: '10px',
                lineHeight: '25px',
                fontWeight: '800',
                color: 'white',
                fontSize: '21px',
              }}
            />
          </ListItem>
        </List>
      </Box>
      <Grid align="center">
        <h2 style={headingStyle}>Sign up</h2>
      </Grid>
      <form onSubmit={formik.handleSubmit}>
        <Grid display="flex" align="center">
          {/* email Textfield */}
          <TextField
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            variant="outlined"
            style={EmailFieldStyle}
            placeholder="Email"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlined
                    sx={{
                      color: 'white',
                    }}
                  />
                </InputAdornment>
              ),
            }}
            sx={{
              input: { color: 'white' },
            }}
          />
        </Grid>
        <Grid>
          {/* username field */}
          <Grid item display="flex">
            <TextField
              id="username"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              variant="outlined"
              style={TextField1style}
              placeholder="Username"
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
              }}
              sx={{
                input: { color: 'white' },
              }}
            />

            {/* fullName field */}

            <TextField
              id="fullname"
              name="fullname"
              value={formik.values.fullname}
              onChange={formik.handleChange}
              variant="outlined"
              style={TextField1style}
              placeholder="Full name"
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PermIdentityOutlined
                      sx={{
                        color: 'white',
                      }}
                    />
                  </InputAdornment>
                ),
              }}
              sx={{
                input: { color: 'white' },
              }}
            />
          </Grid>
        </Grid>
        {/* Password & confirm password */}
        <Grid>
          {/* Password field */}
          <Grid item display="flex">
            <TextField
              id="password1"
              name="password1"
              value={formik.values.password1}
              onChange={formik.handleChange}
              variant="outlined"
              style={TextField1style}
              placeholder="Password"
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Key
                      sx={{
                        color: 'white',
                      }}
                    />
                  </InputAdornment>
                ),
              }}
              sx={{
                input: { color: 'white' },
              }}
            />

            {/* Confirm password field */}

            <TextField
              id="password2"
              name="password2"
              value={formik.values.password2}
              onChange={formik.handleChange}
              variant="outlined"
              style={TextField1style}
              placeholder="Confirm Password"
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <KeyOutlined
                      sx={{
                        color: 'white',
                      }}
                    />
                  </InputAdornment>
                ),
              }}
              sx={{
                input: { color: 'white' },
              }}
            />
          </Grid>
        </Grid>
        {/* Company & Position field */}
        <Grid>
          {/* Company */}
          <Grid item display="flex">
            <TextField
              id="company"
              name="company"
              value={formik.values.company}
              onChange={formik.handleChange}
              variant="outlined"
              style={TextField1style}
              placeholder="Company"
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Business
                      sx={{
                        color: 'white',
                      }}
                    />
                  </InputAdornment>
                ),
              }}
              sx={{
                input: { color: 'white' },
              }}
            />

            {/* Position field */}

            <TextField
              id="position"
              name="position"
              value={formik.values.position}
              onChange={formik.handleChange}
              variant="outlined"
              style={TextField1style}
              placeholder="Position"
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <StarBorderOutlined
                      sx={{
                        color: 'white',
                      }}
                    />
                  </InputAdornment>
                ),
              }}
              sx={{
                input: { color: 'white' },
              }}
            />
          </Grid>
        </Grid>

        {/* signup button */}
        <Grid align="center">
          <Button type="submit" variant="contained" style={btnStyle}>
            Sign up
          </Button>
        </Grid>
      </form>

      {/* already have an account */}
      <Grid align="center">
        <Box>
          <Typography style={formControlStyle}>
            {' '}
            Already have an account? <br />
            <LinkMUI
              component={Link}
              to={'/auth/login'}
              sx={{
                color: 'white',
                textDecoration: 'none',
                fontWeight: '800',
                lineHeight: '24px',
              }}
            >
              Sign in
            </LinkMUI>
          </Typography>
        </Box>
      </Grid>
    </Box>
  );
};
