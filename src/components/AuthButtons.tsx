import { FC, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';
import { useUserContext } from '../context/UserContext';
import loginUser from '../services/portal/loginUser';

const AuthButtons: FC = () => {
  const { loginWithRedirect, logout, isAuthenticated, user, isLoading } = useAuth0();
  const { setEmail, setPsn, setRole, setVerified, setPsnAvatar, setPsnPlus } = useUserContext();

  useEffect(() => {
    const syncUserWithBackend = async () => {
      if (isAuthenticated && user?.email) {
        setEmail(user.email);

        try {
          const response = await loginUser(user.email);
          console.log(`User Data: ${response}`)

          setPsn(response.psn || null);
          setPsn(response.role || 2001);
          setPsn(response.verified || false);
          setPsnAvatar(response.psnAvatar || null);
          setPsnPlus(response.psnPlus || false);
        } catch (error) {
          console.error(`Error fetching user: ${error}`)
        }
      };
    }

    if (!isLoading) {
      syncUserWithBackend();
    }
  }, [isAuthenticated, user, setEmail, setPsn, setRole, setVerified, setPsnAvatar, setPsnPlus]);

  const handleLogin = () => {
    loginWithRedirect();
  };

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
    setEmail(null);
    setPsn(null);
    setRole(2001);
    setVerified(false);
    setPsnAvatar(null);
    setPsnPlus(false);
  };

  return (
    <div>
      {!isAuthenticated ? (
        <Button onClick={handleLogin}>Log In</Button>
      ) : (
        <>
          <Button onClick={handleLogout}>Log Out</Button>
          <p>Welcome {user?.email}</p>
        </>
      )}
    </div>
  );
};

export default AuthButtons;