import { FC, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';
import { useUserContext } from '../../context/UserContext';
import loginUser from '../../services/portal/loginUser';

const AuthButtons: FC = () => {
  const { loginWithRedirect, logout, isAuthenticated, user, isLoading, getAccessTokenSilently } = useAuth0();
  const { setEmail, setPsn, setRole, setVerified, setPsnAvatar, setPsnPlus } = useUserContext();

  useEffect(() => {
    const syncUserWithBackend = async () => {
      if (isAuthenticated && user?.email) {
        setEmail(user.email);

        try {
          const token = await getAccessTokenSilently();
          const response = await loginUser(user.email, token);
          const { token: jwtToken, user: userData } = response;
          localStorage.setItem('jwtToken', jwtToken);

          console.log(`User Data: ${JSON.stringify(response, null, 2)}`);
          console.log(userData.role)

          setPsn(userData.psn || null);
          setRole(userData.role || 2001);
          setVerified(userData.verified || false);
          setPsnAvatar(userData.psnAvatar || null);
          setPsnPlus(userData.psnPlus || false);
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
    localStorage.removeItem('jwtToken');
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