import apiPrivate from '../../api/apiPrivate';

const getAllUserCollection = async (axiosInstance: typeof apiPrivate, id: string) => {
  try {
    const response = await axiosInstance.get(`/collection/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default getAllUserCollection;