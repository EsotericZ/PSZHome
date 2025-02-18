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
    <Box sx={{ display: 'flex', flexDirection: 'column', }}>
      <Navbar />
      <Logo />
      {isAuthenticated ? <ProfileBar /> : <LoginButton />}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flexGrow: 1,
          maxWidth: '1400px',
          width: '100%',
          mx: 'auto', 
          px: isMobile ? 2 : 4, 
          mt: '25px',
          border: '1px solid white'
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};