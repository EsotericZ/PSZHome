import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Box } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';

import LoginButton from '../components/portal/LoginButton';
import Navbar from '../components/Navbar/Navbar';
import ProfileBar from '../components/Navbar/ProfileBar';
import useSyncUserWithBackend from '../hooks/useSyncUserWithBackend';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  useSyncUserWithBackend();
  const { isAuthenticated } = useAuth0();

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar />
      {isAuthenticated ? <ProfileBar /> : <LoginButton />}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};