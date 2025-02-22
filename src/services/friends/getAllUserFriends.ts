import apiPrivate from '../../api/apiPrivate';

const getAllUserFriends = async (axiosInstance: typeof apiPrivate, id: string) => {
  try {
    const response = await axiosInstance.get(`/friends/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default getAllUserFriends;