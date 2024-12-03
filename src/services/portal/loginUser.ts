import api from '../../api/api';

const loginUser = async (email: string) => {
  console.log('loginUser called with:', email);
  // const res = await api.put('/portal', { email });
  // return res.data;
};

export default loginUser;