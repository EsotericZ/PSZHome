import { FC, useState } from 'react';
import { Button, CircularProgress } from '@mui/material';

import updateUserPSN from '../../services/psn/updateUserPSN';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import { useUserContext } from '../../context/UserContext';

interface UpdatePSNButtonProps {
  userId: string | null;
  fetchData?: () => Promise<{ psnAvatar?: string | null; psnPlus?: boolean }>;
}

const UpdatePSNButton: FC<UpdatePSNButtonProps> = ({ userId, fetchData }) => {
  const [updating, setUpdating] = useState<boolean>(false);
  const { dispatch } = useUserContext();
  const apiPrivate = useAxiosPrivate();

  const updateFriendsPSN = async () => {
    if (!userId) {
      console.warn('UserID Not Available');
      return;
    }

    setUpdating(true);
    try {
      await updateUserPSN(apiPrivate, userId);
      
      if (fetchData) {
        const updatedData = await fetchData();

        if (updatedData.psnAvatar || updatedData.psnPlus !== undefined) {
          dispatch({
            type: 'SET_USER',
            payload: {
              psnAvatar: updatedData.psnAvatar,
              psnPlus: updatedData.psnPlus,
            },
          });
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <Button
      variant='contained'
      color='primary'
      onClick={updateFriendsPSN}
      disabled={updating}
      sx={{ mb: 2 }}
    >
      {updating ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Update'}
    </Button>
  );
};

export default UpdatePSNButton;