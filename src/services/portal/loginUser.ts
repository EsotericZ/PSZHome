import api from '../../api/api';
import axios from 'axios';

interface UserData {
  email: string;
}

const loginUser = async (userData: UserData): Promise<{ status: string; user?: UserData }> => {
  console.log('loginUser called with:', userData);
  try {
    const res = await api.put('/portal', { userData });
    console.log('API response:', res.data);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        console.warn('User not found in database (404):', error.response.data);
        return { status: 'not_found' }; // Handle 404 explicitly
      } else {
        console.error('Error response from server:', error.response?.status, error.response?.data);
        throw new Error('Server error occurred');
      }
    } else {
      console.error('Unexpected error:', error);
      throw error;
    }
  }
};

export default loginUser;