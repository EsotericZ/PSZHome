import apiPrivate from '../../api/apiPrivate';

const getUserWishlist = async (axiosInstance: typeof apiPrivate, userId: string) => {
  try {
    const response = await axiosInstance.get(`/wishlist/${userId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default getUserWishlist;