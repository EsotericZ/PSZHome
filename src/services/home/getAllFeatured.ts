import api from '../../api/api';

const getAllFeatured = async (userId?: string) => {
  try {
    const response = await api.get('/home', { 
      params: userId ? { userId } : {},
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching featured games:', error);
    return null;
  }
}

export default getAllFeatured;