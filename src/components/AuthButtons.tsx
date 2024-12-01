import { FC } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';

const AuthButtons: FC = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect({
      authorizationParams: {
        screen_hint: "login",
      },
    })
  }

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  }

  return (
    <div>
      {!isAuthenticated ? (
        <Button onClick={handleLogin}>Log In</Button>
      ) : (
        <>
          <Button onClick={handleLogout}>Log Out</Button>
          {user && (
            <div>
              <p>Welcome {user.name}</p>
              <p>Email {user.email}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AuthButtons;