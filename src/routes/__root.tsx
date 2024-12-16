import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Box } from '@mui/material';

import Navbar from '../components/navbar/Navbar';
import useSyncUserWithBackend from '../hooks/useSyncUserWithBackend';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  useSyncUserWithBackend();

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar />
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
}