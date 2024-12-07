import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { useAuth0 } from '@auth0/auth0-react';
import { Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material';

import LoginComponent from '../components/portal/LoginComponent';
import LogoutComponent from '../components/portal/LogoutComponent';
import useSyncUserWithBackend from '../hooks/useSyncUserWithBackend';

export const Route = createRootRoute({
  component: RootComponent,
});

const navWidth = 200;

function RootComponent() {
  const { isAuthenticated } = useAuth0();
  useSyncUserWithBackend();

  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        component='nav'
        sx={{ width: { sm: navWidth }, flexShrink: { sm: 0 } }}
      >
        <List>
          <ListItem sx={{border: 'solid 1px'}}>
            <ListItemButton component={Link} to={'/'}>
              <ListItemText>Home</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem sx={{border: 'solid 1px'}}>
            <ListItemButton component={Link} to={'/admin'}>
              <ListItemText>Admin</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem sx={{border: 'solid 1px'}}>
            <ListItemButton component={Link} to={'/profile'}>
              <ListItemText>Profile</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem sx={{border: 'solid 1px'}}>
            {isAuthenticated ? <LogoutComponent /> : <LoginComponent />}
          </ListItem>
        </List>
      </Box>
      <Box
        component='main'
        sx={{ width: { sm: `calc(100% - ${navWidth}px)` }, flexGrow: 1, p: 3 }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}