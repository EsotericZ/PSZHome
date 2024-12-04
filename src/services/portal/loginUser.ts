import api from '../../api/api';
import UserProps from '../../types/UserTypes';

interface LoginResponse {
  user: UserProps;
  token: string;
}

const loginUser = async (email: string, token: string): Promise<LoginResponse> => {
  const res = await api.post('/portal', 
    { email },
    {
      headers: {
        Authorization: `Bearer ${token}`
      },
    }
  );
  return res.data;
};

export default loginUser;