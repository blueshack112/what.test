//@flow
import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import { useSWRConfig } from 'swr';
import * as actionCreators from 'modules/auth/actionCreators';
import LoadingOrErrorWrapper from '../LoadingOrErrorWrapper';
import { logOut } from 'modules/auth/workflow';
import { useNavigate } from 'react-router-dom';
import { useGlobalSWR } from 'lib/comms_v2/useGlobalSWR';
import { UserSWREntity } from 'modules/auth/typedefs';
import './style.css';

const NavbarAccountMenu = () => {
  const userEntity: UserSWREntity = useGlobalSWR(actionCreators.getCurrentUserAction());
  const navigate = useNavigate();
  const { cache: swrCache } = useSWRConfig();

  const [anchorElement, setAnchorElement] = React.useState(null);
  const open = Boolean(anchorElement);

  const handleMenuClicked = (event) => {
    setAnchorElement(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorElement(null);
  };
  const onLogoutClicked = () => {
    logOut(navigate, swrCache);
  };
  const avatarContent = userEntity.data
    ? (userEntity.data.firstName ||
        userEntity.data.lastName ||
        userEntity.data.username)[0].toUpperCase()
    : '?';

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account Actions" enterDelay={500}>
          <>
            <IconButton
              onClick={handleMenuClicked}
              size="small"
              sx={{
                mr: 3,
              }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              className={'CustomIconButton'}
            >
              <LoadingOrErrorWrapper
                swrEntity={userEntity}
                errorFallback={logOut}
                errorFallbackArgs={[navigate, swrCache]}
              >
                <Avatar sx={{ width: 32, height: 32 }}>{avatarContent}</Avatar>
              </LoadingOrErrorWrapper>
            </IconButton>
          </>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorElement}
        id="account-menu"
        open={open}
        onClose={closeMenu}
        onClick={closeMenu}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
          },
        }}
      >
        <MenuItem onClick={onLogoutClicked}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default NavbarAccountMenu;
