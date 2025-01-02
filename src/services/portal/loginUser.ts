import api from '../../api/api';
import UserProps from '../../types/UserTypes';

interface LoginResponse {
  user: UserProps;
  token: string;
  refreshToken: string;
}

const loginUser = async (email: string, token: string): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>(
    '/portal', 
    { email },
    {
      headers: {
        Authorization: `Bearer ${token}`
      },
    }
  );

  if (res.data.refreshToken) {
    localStorage.setItem('pszRefreshToken', res.data.refreshToken);
  };

  return res.data;
};

export default loginUser;