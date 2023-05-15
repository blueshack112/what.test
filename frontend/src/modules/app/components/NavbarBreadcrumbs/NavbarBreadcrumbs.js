import { Link, useLocation } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { default as LinkMUI } from '@mui/material/Link';
import BreadcrumbsMap from 'lib/BreadcrumbsMap';
import { Dashboard as DashboardIcon } from '@mui/icons-material';
import { Box } from '@mui/material';

const breadCrumbsInactiveSx = { color: 'gray' };
const breadCrumbsActiveSx = { color: 'white' };

const NavbarBreadcrumbs = () => {
  const location = useLocation();
  const pathNames = location.pathname.split('/').filter((x) => x);
  const CreateLink = (props) => {
    return <LinkMUI {...props} component={Link} />;
  };
  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      separator="/"
      sx={{ '& .MuiBreadcrumbs-separator': breadCrumbsActiveSx }}
    >
      <CreateLink
        underline="hover"
        color={pathNames.length ? 'inherit' : 'text.primary'}
        to="/"
        sx={Object.assign(pathNames.length ? breadCrumbsInactiveSx : breadCrumbsActiveSx, {
          display: 'flex',
          alignItems: 'center',
        })}
      >
        <Box display={'flex'}>
          <DashboardIcon sx={{ marginRight: 0.5, marginY: 'auto' }} fontSize="inherit" />
          <Typography>Dashboard</Typography>
        </Box>
      </CreateLink>
      {pathNames.map((value, index) => {
        const isLast = index === pathNames.length - 1;
        const to = `/${pathNames.slice(0, index + 1).join('/')}`;
        return isLast ? (
          <Typography sx={breadCrumbsActiveSx} key={to}>
            {BreadcrumbsMap[to]}
          </Typography>
        ) : (
          <CreateLink underline="hover" sx={breadCrumbsInactiveSx} to={to} key={to}>
            {BreadcrumbsMap[to]}
          </CreateLink>
        );
      })}
    </Breadcrumbs>
  );
};

export default NavbarBreadcrumbs;
