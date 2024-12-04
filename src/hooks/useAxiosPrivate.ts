import { useEffect } from 'react';
import type { AxiosInstance } from 'axios';

import apiPrivate from '../api/apiPrivate';

const useAxiosPrivate = (): AxiosInstance => {
  useEffect(() => {
    const requestInterceptor = apiPrivate.interceptors.request.use(
      async (config) => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      apiPrivate.interceptors.request.eject(requestInterceptor);
    };
  }, []);

  return apiPrivate;
};

export default useAxiosPrivate;