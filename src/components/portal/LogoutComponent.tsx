import { FC } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useUserContext } from '../../context/UserContext';
import { ListItemButton, ListItemText } from '@mui/material';

const LogoutComponent: FC = () => {
  const { logout } = useAuth0();
  const { dispatch } = useUserContext();

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
    localStorage.removeItem('pszToken');
    localStorage.removeItem('userState');
    dispatch({ type: 'RESET_USER' });
  };

  return (
    <ListItemButton onClick={handleLogout}>
      <ListItemText>Logout</ListItemText>
    </ListItemButton>
  );
};

export default LogoutComponent;