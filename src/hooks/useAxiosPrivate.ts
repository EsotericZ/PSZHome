import { useEffect } from 'react';
import { AxiosInstance, isAxiosError } from 'axios';

import apiPrivate from '../api/apiPrivate';
import refreshToken from '../services/portal/refreshToken';

const useAxiosPrivate = (): AxiosInstance => {
  useEffect(() => {
    let refreshInProgress = false;
    let refreshSubscribers: ((token: string) => void)[] = [];

    const subscribeTokenRefresh = (callback: (token: string) => void) => {
      refreshSubscribers.push(callback);
    };

    const onRefreshed = (newToken: string) => {
      refreshSubscribers.forEach((callback) => callback(newToken));
      refreshSubscribers = [];
    };

    const isTokenExpired = (): boolean => {
      const token = localStorage.getItem('pszToken');
      if (!token) return true;

      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp < currentTime;
    };

    const requestInterceptor = apiPrivate.interceptors.request.use(
      async (config) => {
        if (isTokenExpired() && !refreshInProgress) {
          refreshInProgress = true;
          const newToken = await refreshToken();
          localStorage.setItem('pszToken', newToken);
          apiPrivate.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
          refreshInProgress = false;

          onRefreshed(newToken);
        }

        const token = localStorage.getItem('pszToken');
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = apiPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          if (refreshInProgress) {
            return new Promise((resolve, reject) => {
              subscribeTokenRefresh((newToken) => {
                originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                apiPrivate(originalRequest).then(resolve).catch(reject);
              });
            });
          }

          originalRequest._retry = true;
          refreshInProgress = true;

          try {
            const newToken = await refreshToken();
            localStorage.setItem('pszToken', newToken);
            apiPrivate.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
            refreshInProgress = false;

            onRefreshed(newToken);
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
            return apiPrivate(originalRequest);
          } catch (refreshError) {
            refreshInProgress = false;
            refreshSubscribers = [];

            if (isAxiosError(refreshError)) {
              const status = refreshError.response?.status;
              if (status === 401) {
                localStorage.removeItem('pszToken');
                window.location.href = '/';
              }
            }
            return Promise.reject(refreshError);
          }
        }

        if (error.response?.status === 401) {
          console.warn('Silently suppressing known 401 error');
          return new Promise(() => {});
        }

        return Promise.reject(error);
      }
    );

    return () => {
      apiPrivate.interceptors.request.eject(requestInterceptor);
      apiPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return apiPrivate;
};

export default useAxiosPrivate;
