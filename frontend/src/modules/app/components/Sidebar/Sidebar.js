//@flow
import React from 'react';
import { Box, Grid, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';

import { Dashboard, People } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import NavPaths from '../../NavPaths';
import { lineStyle, lineStyle2, sidebarStyle } from './styles';
import SidebarButton from '../SidebarButton';
import { isSuperuserOrAdmin } from 'modules/auth/utils';
import type { UserSWREntity } from 'modules/auth/typedefs';
import { useGlobalSWR } from 'lib/comms_v2/useGlobalSWR';
import * as authActionCreators from 'modules/auth/actionCreators';

export const Sidebar = () => {
  const navigate = useNavigate();
  const userEntity: UserSWREntity = useGlobalSWR(authActionCreators.getCurrentUserAction());
  const onDashboardButtonClicked = () => {
    navigate(NavPaths.dashboard);
  };
  const onUserButtonClicked = () => {
    navigate(NavPaths.users);
  };

  const location = useLocation();
  return (
    <Box
      style={sidebarStyle}
      // display="flex" alignItems="flex-start" flexDirection= "column"
    >
      <Box display="flex" justifyContent="center" maxHeight="100vh">
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
        <Box style={lineStyle}></Box>
      </Grid>
      {/* Dashboard Button */}
      <Grid align="center" mt={'15vh'}>
        <Box>
          <SidebarButton
            Icon={Dashboard}
            onClick={onDashboardButtonClicked}
            label={'Dashboard'}
            selected={location.pathname === '/'}
          />
          {isSuperuserOrAdmin(userEntity.data && userEntity.data) && (
            <SidebarButton
              Icon={People}
              onClick={onUserButtonClicked}
              label={'Users'}
              selected={location.pathname === '/users'}
            />
          )}
        </Box>
      </Grid>

      {/* Line at end of Dashboard Button */}
      <Grid align="center">
        <Box style={lineStyle2}></Box>
      </Grid>
    </Box>
  );
};
