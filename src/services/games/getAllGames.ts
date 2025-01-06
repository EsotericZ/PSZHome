import apiPrivate from "../../api/apiPrivate";

const getAllGames = async (AxiosInstance: typeof apiPrivate) => {
  try {
    const response = await AxiosInstance.get('/games');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default getAllGames;