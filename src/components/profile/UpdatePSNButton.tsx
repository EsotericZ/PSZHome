import { FC, useState } from 'react';
import { Button, CircularProgress } from '@mui/material';

import updateUserPSN from '../../services/psn/updateUserPSN';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

interface UpdatePSNButtonProps {
  userId: string | null;
  fetchData: () => Promise<void>;
}

const UpdatePSNButton: FC<UpdatePSNButtonProps> = ({ userId, fetchData }) => {
  const [updating, setUpdating] = useState<boolean>(false);
  const apiPrivate = useAxiosPrivate();

  const updateFriendsPSN = async () => {
    if (!userId) {
      console.warn('UserID Not Available');
      return;
    }

    setUpdating(true);
    try {
      await updateUserPSN(apiPrivate, userId);
      await fetchData();
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