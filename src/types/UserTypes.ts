interface UserProps {
  id: string;
  email: string;
  psn?: string;
  role: number;
  verified: boolean;
  verifyCode?: string;
  psnAccountId?: string;
  psnAvatar?: string;
  psnPlus: boolean;
  createdAt: string;
}

export default UserProps;