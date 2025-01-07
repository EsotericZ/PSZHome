import apiPrivate from '../../api/apiPrivate';

const getNewUsers = async (axiosInstance: typeof apiPrivate) => {
  try {
    const response = await axiosInstance.get('/admin/newUsers');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default getNewUsers;