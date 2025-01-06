import { FC } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import { Box, Button } from '@mui/material';

const LoginButton: FC = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect();
  }

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 16,
        right: 16,
        zIndex: 1200, 
      }}
    >
      <Button 
        onClick={handleLogin}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          cursor: 'pointer',
        }}
        variant='contained'
        color='primary'
      >
        Login 
      </Button>
    </Box>
  );
}

export default LoginButton;