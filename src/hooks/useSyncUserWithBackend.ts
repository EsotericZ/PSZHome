import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useUserContext } from '../context/UserContext';

import loginUser from '../services/portal/loginUser';

const useSyncUserWithBackend = () => {
  const { isAuthenticated, user, isLoading, getAccessTokenSilently } = useAuth0();
  const { dispatch } = useUserContext();

  useEffect(() => {
    const syncUserWithBackend = async () => {
      if (isAuthenticated && user?.email) {
        try {
          const token = await getAccessTokenSilently();
          const response = await loginUser(user.email, token);
          const { token: pszToken, user: userData } = response;

          localStorage.setItem('pszToken', pszToken);

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
          console.error(`Error fetching user: ${error}`);
        }
      }
    };

    if (!isLoading) {
      syncUserWithBackend();
    }
  }, [isAuthenticated, user, getAccessTokenSilently, dispatch, isLoading]);
};

export default useSyncUserWithBackend;