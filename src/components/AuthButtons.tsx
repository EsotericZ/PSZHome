import { FC, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';

import loginUser from '../services/portal/loginUser';

const AuthButtons: FC = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const [validated, setValidated] = useState(false);

  const handleLogin = async () => {
    loginWithRedirect({
      authorizationParams: {
        screen_hint: 'login',
      },
    });
  };

  useEffect(() => {
    const syncUserWithBackend = async () => {
      if (isAuthenticated && user) {
        console.log('Calling loginUser function...');
        try {
          if (!user.email) {
            throw new Error('Email is required');
          }
          
          const response = await loginUser({ email: user.email });
          console.log('Response from loginUser:', response);

          if (response.status === 'not_found') {
            console.error('User not found in database. Logging out...');
            await logout({ logoutParams: { returnTo: window.location.origin } });
          } else {
            console.log('User logged in successfully:', response.user);
            setValidated(true);
          }
        } catch (error) {
          console.error('Error in loginUser function:', error);
        } finally {
        }
      }
    };

    syncUserWithBackend();
  }, [isAuthenticated, user]);

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return (
    <div>
      {!isAuthenticated ? (
        <>
          <Button onClick={handleLogin}>Log In</Button>
        </>
      ) : (
        validated && user && (
        <>
          <Button onClick={handleLogout}>Log Out</Button>
            <div>
              <p>Welcome {user.name}</p>
              <p>Email {user.email}</p>
            </div>
          </>
        )
      )}
    </div>
  );
};

export default AuthButtons;
