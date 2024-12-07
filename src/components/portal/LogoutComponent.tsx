import { FC } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useUserContext } from '../../context/UserContext';
import { ListItemButton, ListItemText } from '@mui/material';

const LogoutComponent: FC = () => {
  const { logout } = useAuth0();
  const { setEmail, setPsn, setRole, setVerified, setPsnAvatar, setPsnPlus } = useUserContext();

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
    localStorage.removeItem('jwtToken');
    setEmail(null);
    setPsn(null);
    setRole(2001);
    setVerified(false);
    setPsnAvatar(null);
    setPsnPlus(false);
  };

  return (
    <ListItemButton onClick={handleLogout}>
      <ListItemText>Logout</ListItemText>
    </ListItemButton>
  );
};

export default LogoutComponent;