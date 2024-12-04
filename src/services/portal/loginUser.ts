import api from '../../api/api';
import UserProps from '../../types/UserTypes';

const loginUser = async (email: string): Promise<UserProps> => {
  const res = await api.post('/portal', { email });
  return res.data as UserProps;
};

export default loginUser;