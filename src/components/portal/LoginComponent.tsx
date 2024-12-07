import { FC } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { ListItemButton, ListItemText } from '@mui/material';

const LoginComponent: FC = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect();
  };

  return (
    <ListItemButton onClick={handleLogin}>
      <ListItemText>Login</ListItemText>
    </ListItemButton>
  );
};

export default LoginComponent;