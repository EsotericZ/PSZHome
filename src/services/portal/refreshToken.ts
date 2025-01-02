import api from '../../api/api';

interface RefreshTokenResponse {
  token: string;
}

const refreshToken = async (): Promise<string> => {
  const pszRefreshToken = localStorage.getItem('pszRefreshToken');
  if (!pszRefreshToken) {
    throw new Error('No refresh token available');
  };

  const res = await api.post<RefreshTokenResponse>('/portal/refreshToken', {
    refreshToken: pszRefreshToken
  });

  return res.data.token;
};

export default refreshToken;