import apiPrivate from "../../api/apiPrivate";

const getAllGames = async (axiosInstance: typeof apiPrivate) => {
  try {
    const response = await axiosInstance.get('/games');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default getAllGames;