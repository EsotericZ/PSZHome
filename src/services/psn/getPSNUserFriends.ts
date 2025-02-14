import apiPrivate from '../../api/apiPrivate';

const getPSNUserFriends = async (AxiosInstance: typeof apiPrivate, id: string) => {
  try {
    const response = await AxiosInstance.get(`/psn/friends/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default getPSNUserFriends;