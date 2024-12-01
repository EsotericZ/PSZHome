import { FC, ReactElement } from 'react';
import { Navigate } from '@tanstack/react-router';
import { useAuth0 } from '@auth0/auth0-react';

interface PrivateRouteProps {
  children: ReactElement;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to='/' />;
};

export default PrivateRoute;