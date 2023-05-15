import React from 'react';
import NavbarBreadcrumbs from '../NavbarBreadcrumbs';
import { Box } from '@mui/material';
import NavbarAccountMenu from '../NavbarAccountMenu';
import { STANDARD_MARGINS } from 'lib/constants';

const Navbar = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'stretch',
          marginY: STANDARD_MARGINS.mainContentY,
          marginLeft: STANDARD_MARGINS.mainContentLeft,
        }}
      >
        <Box sx={{ marginY: 'auto' }}>
          <NavbarBreadcrumbs />
        </Box>
        <NavbarAccountMenu />
      </Box>
    </>
  );
};

export default Navbar;
