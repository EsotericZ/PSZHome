import { FC, useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';

import updateUserPSN from '../../services/psn/updateUserPSN';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import { useUserContext } from '../../context/UserContext';

interface UpdatePSNButtonProps {
  userId: string | null;
  fetchData?: () => Promise<void>;
}

const UpdatePSNButton: FC<UpdatePSNButtonProps> = ({ userId, fetchData }) => {
  const [updating, setUpdating] = useState<boolean>(false);
  const { dispatch, state } = useUserContext();
  const apiPrivate = useAxiosPrivate();

  const updateFriendsPSN = async () => {
    if (!userId) {
      console.warn('UserID Not Available');
      return;
    }
  
    setUpdating(true);
    try {
      const response = await updateUserPSN(apiPrivate, userId);
  
      if (response.success === false && response.timeRemaining) {
        const timeLeft = Math.ceil(response.timeRemaining / 1000);
  
        if (state.accountLevel === 'standard') {
          const hours = Math.floor(timeLeft / 3600);
          const minutes = Math.floor((timeLeft % 3600) / 60);
          const seconds = timeLeft % 60;
          const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  
          toast.error(
            <span>
              Standard Account <br />
              Can Only Update Once Per Day <br />
              Try Again in <strong>{formattedTime}</strong> <br />
              <a href="/upgrade" style={{ color: '#ffcc00', textDecoration: 'underline' }}>
                Upgrade Here
              </a>
            </span>,
            {
              autoClose: 4000, 
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: 'colored',
            }
          );
        } else {
          toast.warning(`Try Again in ${timeLeft} Seconds.`);
        }
        return;
      }

      dispatch({
        type: 'SET_USER',
        payload: {
          psnAvatar: response.userData?.profile?.avatarUrls?.[0]?.avatarUrl || state.psnAvatar,
          psnPlus: response.userData?.profile?.plus === 1,
        },
      });
    
      if (fetchData) {
        await fetchData();
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to update PSN data.');
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
      sx={{ mb: 2, width: '100px' }}
    >
      {updating ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Update'}
    </Button>
  );
};

export default UpdatePSNButton;