import { FC, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';
import { useUserContext } from '../../context/UserContext';

import loginUser from '../../services/portal/loginUser';

const AuthButtons: FC = () => {
  const { loginWithRedirect, logout, isAuthenticated, user, isLoading, getAccessTokenSilently } = useAuth0();
  const { dispatch } = useUserContext();

  useEffect(() => {
    const syncUserWithBackend = async () => {
      if (isAuthenticated && user?.email) {
        try {
          const token = await getAccessTokenSilently();
          const response = await loginUser(user.email, token);
          const { token: pszToken, user: userData } = response;
          localStorage.setItem('pszToken', pszToken);

          console.log(`User Data: ${JSON.stringify(response, null, 2)}`);
          console.log(userData.role)

          dispatch({
            type: 'SET_USER',
            payload: {
              email: user.email,
              psn: userData.psn,
              role: userData.role,
              verified: userData.verified,
              psnAvatar: userData.psnAvatar,
              psnPlus: userData.psnPlus,
            },
          });
        } catch (error) {
          console.error(`Error fetching user: ${error}`)
        }
      };
    }

    if (!isLoading) {
      syncUserWithBackend();
    }
  }, [isAuthenticated, user, getAccessTokenSilently, dispatch, isLoading]);

  const handleLogin = () => {
    loginWithRedirect();
  };

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
    localStorage.removeItem('pszToken');
    localStorage.removeItem('userState');
    dispatch({ type: 'RESET_USER' });
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