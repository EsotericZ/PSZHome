import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider, Auth0ProviderOptions, CacheLocation } from '@auth0/auth0-react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import App from './App';

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

if (!domain || !clientId) {
  throw new Error('Auth0 domain and clientId are required in the environment variables');
}

const providerConfig: Auth0ProviderOptions = {
  domain: domain,
  clientId: clientId,
  authorizationParams: {
    redirect_uri: window.location.origin,
  },
  cacheLocation: 'localstorage' as CacheLocation,
}

const rootElement = document.getElementById('root')!;
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <Auth0Provider {...providerConfig}>
      <StrictMode>
        <UserProvider>
          <ThemeProvider>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </UserProvider>
      </StrictMode>
    </Auth0Provider>
  );
}