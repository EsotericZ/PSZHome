import { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';

import { useUserContext } from '../../context/UserContext';

import FriendProps from '../../types/FriendTypes';
import LoadSymbol from '../shared/LoadSymbol';

import getAllUserFriends from '../../services/friends/getAllUserFriends';
import getPSNUserFriends from '../../services/psn/getPSNUserFriends';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const Friends = () => {
  const [friendList, setFriendList] = useState<FriendProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [updating, setUpdating] = useState<boolean>(false);
  const { state } = useUserContext();
  const apiPrivate = useAxiosPrivate();

  const fetchData = async () => {
    if (!state.id) {
      console.warn('UserID Not Available');
      return;
    }

    try {
      const friendData = await getAllUserFriends(apiPrivate, state.id);
      setFriendList(friendData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const updateFriendsPSN = async () => {
    if (!state.id) {
      console.warn('UserID Not Available');
      return;
    }

    setUpdating(true);
    try {
      await getPSNUserFriends(apiPrivate, state.id);
      await fetchData();
    } catch (error) {
      console.error(error);
    } finally {
      setUpdating(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    state.verified ? (
      <Box>
        {loading ? (
          <LoadSymbol />
        ) : (
          <>
            <Typography>Friends</Typography>
            <Button
              variant='contained'
              color='primary'
              onClick={updateFriendsPSN}
              disabled={updating}
              sx={{ mb: 2 }}
            >
              {updating ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Update'}
            </Button>
            {friendList.map((friend, index) => (
              <p key={index}>{friend.pszUser ? 'Y' : 'N'} {friend.username}</p>
            ))}
          </>
        )}
      </Box>
    ) : (
      <Box>
        <Typography>Verify Your Profile To Use This Feature</Typography>
      </Box>
    )
  )
}

export default Friends;