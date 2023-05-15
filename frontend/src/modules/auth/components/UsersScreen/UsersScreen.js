import { Box, Divider, InputAdornment, TextField, Typography } from '@mui/material';
import React from 'react';
import { STANDARD_MARGINS } from 'lib/constants';
import { SearchOutlined } from '@mui/icons-material';
import UsersTable from '../UsersTable';
import { pageHeadingSx } from 'modules/app/styles';

const UsersScreen = () => {
  return (
    <Box
      sx={{
        marginLeft: STANDARD_MARGINS.mainContentLeft,
        marginRight: STANDARD_MARGINS.mainContentRight,
      }}
    >
      <Typography variant="h2" sx={pageHeadingSx}>
        Users
      </Typography>
      <Box>
        <Box>
          <TextField
            variant="outlined"
            id="search-text-field"
            placeholder="Search User"
            sx={{ background: 'transparent', border: '2px solid #FFF', borderRadius: '5px' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlined
                    sx={{
                      color: 'white',
                    }}
                  />
                </InputAdornment>
              ),
              sx: { color: 'white' },
            }}
          />
        </Box>
        <Divider sx={{ background: 'white', marginY: 2 }} />
        <UsersTable />
      </Box>
    </Box>
  );
};

export default UsersScreen;
