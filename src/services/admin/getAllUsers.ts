import apiPrivate from '../../api/apiPrivate';

const getAllUsers = async (axiosInstance: typeof apiPrivate) => {
  try {
    const response = await axiosInstance.get('/admin');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default getAllUsers;