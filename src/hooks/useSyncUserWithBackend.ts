import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useUserContext } from '../context/UserContext';
import loginUser from '../services/portal/loginUser';

const useSyncUserWithBackend = () => {
  const { isAuthenticated, user, isLoading, getAccessTokenSilently } = useAuth0();
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

          setPsn(userData.psn || null);
          setRole(userData.role || 2001);
          setVerified(userData.verified || false);
          setPsnAvatar(userData.psnAvatar || null);
          setPsnPlus(userData.psnPlus || false);
        } catch (error) {
          console.error(`Error fetching user: ${error}`);
        }
      }
    };

    if (!isLoading) {
      syncUserWithBackend();
    }
  }, [isAuthenticated, isLoading, user, setEmail, setPsn, setRole, setVerified, setPsnAvatar, setPsnPlus]);
};

export default useSyncUserWithBackend;