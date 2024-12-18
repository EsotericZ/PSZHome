import { FC } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import { Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const LoginComponent: FC = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect();
  };

  return (
    <Box 
      onClick={handleLogin}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        color: 'inherit',
        cursor: 'pointer',
      }}
    >
      <CloseIcon sx={{ fontSize: 34 }} />
    </Box>
  );
};

export default LoginComponent;