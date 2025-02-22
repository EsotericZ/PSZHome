import apiPrivate from "../../api/apiPrivate";

const updateWishlist = async (axiosInstance: typeof apiPrivate, igdbId: number, userId: string) => {
  try {
    const response = await axiosInstance.post('/wishlist', {
      igdbId,
      userId,
    })
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default updateWishlist;