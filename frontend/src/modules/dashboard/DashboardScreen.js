import { Box, Typography } from '@mui/material';
import React from 'react';
import DashboardTabs from './components/DashboardTabs';
import { STANDARD_MARGINS } from 'lib/constants';
import { pageHeadingSx } from 'modules/app/styles';
import { AttackDataProvider } from 'modules/app/context/AttackDataContext';

const DashboardScreen = () => {
  return (
    <AttackDataProvider>
      <Box
        sx={{
          marginLeft: STANDARD_MARGINS.mainContentLeft,
          marginRight: STANDARD_MARGINS.mainContentRight,
        }}
      >
        <Typography variant="h2" sx={pageHeadingSx}>
          Dashboard
        </Typography>
        <DashboardTabs />
      </Box>
    </AttackDataProvider>
  );
};

export default DashboardScreen;
