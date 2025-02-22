import apiPrivate from '../../api/apiPrivate';

const updateUserPSN = async (axiosInstance: typeof apiPrivate, id: string) => {
  try {
    const response = await axiosInstance.get(`/psn/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default updateUserPSN;