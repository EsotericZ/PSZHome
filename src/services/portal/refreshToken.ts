import apiPrivate from '../../api/apiPrivate';

interface refreshTokenResponse {
  token: string;
}

const refreshToken = async (axiosInstance: typeof apiPrivate): Promise<string> => {
  const res = await axiosInstance.post<refreshTokenResponse>('/portal/refreshToken',
    {},
    { withCredentials: true },
  );
  return res.data.token;
};

export default refreshToken;