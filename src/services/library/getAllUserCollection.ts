import apiPrivate from "../../api/apiPrivate";

const getAllUserCollection = async (AxiosInstance: typeof apiPrivate, id: string) => {
  try {
    const response = await AxiosInstance.get(`/collection/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default getAllUserCollection;