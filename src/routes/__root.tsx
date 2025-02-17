import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Box, useMediaQuery } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';

import Logo from '../components/navigation/Logo';
import LoginButton from '../components/portal/LoginButton';
import Navbar from '../components/navigation/Navbar';
import ProfileBar from '../components/navigation/ProfileBar';
import useSyncUserWithBackend from '../hooks/useSyncUserWithBackend';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  useSyncUserWithBackend();
  const { isAuthenticated } = useAuth0();

  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar />
      <Logo />
      {isAuthenticated ? <ProfileBar /> : <LoginButton />}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          mt: '75px',
          mx: isMobile ? 0 : '25px'
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};