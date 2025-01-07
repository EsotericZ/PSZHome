import apiPrivate from '../../api/apiPrivate';

const getVerifiedUsers = async (axiosInstance: typeof apiPrivate) => {
  try {
    const response = await axiosInstance.get('/admin/verified');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default getVerifiedUsers;