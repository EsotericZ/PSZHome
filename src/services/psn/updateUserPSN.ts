import apiPrivate from '../../api/apiPrivate';

const updateUserPSN = async (AxiosInstance: typeof apiPrivate, id: string) => {
  try {
    const response = await AxiosInstance.get(`/psn/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default updateUserPSN;