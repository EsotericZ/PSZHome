import api from '../../api/api';

interface UserData {
  email: string;
}

const createUser = async (userData: UserData): Promise<{ status: string; user: UserData }> => {
  try {
    const res = await api.post('/portal', { userData });
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error creating user:', error.message);
    } else if (typeof error === 'object' && error !== null && 'response' in error) {
      const axiosError = error as { response: { data: any } };
      console.error('Error creating user:', axiosError.response?.data || 'Unknown response error');
    } else {
      console.error('Unknown error creating user:', error);
    }

    throw error;
  }
};

export default createUser;