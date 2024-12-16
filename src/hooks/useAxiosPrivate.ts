import { useEffect } from 'react';
import type { AxiosInstance } from 'axios';

import apiPrivate from '../api/apiPrivate';

const useAxiosPrivate = (): AxiosInstance => {
  useEffect(() => {
    const requestInterceptor = apiPrivate.interceptors.request.use(
      (config) => {
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
          originalRequest._retry = true;

          try {
            const refreshResponse = await apiPrivate.post('/portal/refreshToken', {}, { withCredentials: true });
            const newToken = refreshResponse.data.token;

            localStorage.setItem('pszToken', newToken);
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

            return apiPrivate(originalRequest);
          } catch (refreshError) {
            console.error('Failed to refresh token:', refreshError);
            localStorage.removeItem('pszToken');
            window.location.href = '/';
            return Promise.reject(refreshError);
          }
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