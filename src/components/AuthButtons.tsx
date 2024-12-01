import { FC } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const AuthButtons: FC = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  return (
    <div>
      {!isAuthenticated ? (
        <button onClick={() => loginWithRedirect()}>Log In</button>
      ) : (
        <>
          <button
            onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
          >
            Log Out
          </button>
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