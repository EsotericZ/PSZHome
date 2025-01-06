import apiPrivate from '../../api/apiPrivate';

const getAllFeatured = async (axiosInstance: typeof apiPrivate) => {
  try {
    const response = await axiosInstance.get('/admin');
    return response.data;
  } catch (error) {
  }
}

export default getAllFeatured;