import apiPrivate from '../../api/apiPrivate';

const getAllUserFriends = async (AxiosInstance: typeof apiPrivate, id: string) => {
  try {
    const response = await AxiosInstance.get(`/friends/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default getAllUserFriends;