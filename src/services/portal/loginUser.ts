import api from '../../api/api';
import UserProps from '../../types/UserTypes';

interface LoginResponse {
  user: UserProps;
  token: string;
  refreshToken: string;
}

const loginUser = async (email: string, token: string): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>(
    '/portal', 
    { email },
    {
      headers: {
        Authorization: `Bearer ${token}`
      },
    }
  );

  if (response.data.refreshToken) {
    localStorage.setItem('pszRefreshToken', response.data.refreshToken);
  };

  return response.data;
};

export default loginUser;