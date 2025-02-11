import api from '../../api/api';

const getAllFeatured = async () => {
  try {
    const response = await api.get('/home');
    return response.data;
  } catch (error) {
  }
}

export default getAllFeatured;