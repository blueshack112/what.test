import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import NavbarAccountMenu from './NavbarAccountMenu';
import { pageContentMargins } from 'lib/constants';
import NavbarButton from './NavbarButton';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Grid
      container
      alignItems={'stretch'}
      sx={{
        paddingX: pageContentMargins.contentX,

        color: 'black',
        borderBottom: '1px solid gray',
      }}
    >
      <Typography sx={{ alignSelf: 'center' }}>What Test By Hassan</Typography>
      <Grid sx={{ display: 'flex', flexDirection: 'row', marginX: 4 }}>
        <NavbarButton
          label={'Products'}
          onClick={() => {
            navigate('/');
          }}
          selected={location.pathname === '/'}
        />
      </Grid>
      <Box sx={{ marginLeft: 'auto', marginY: 'auto' }}>
        <NavbarAccountMenu />
      </Box>
    </Grid>
  );
};

export default Navbar;
