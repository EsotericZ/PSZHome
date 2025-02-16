import { FC, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

import { useUserContext } from '../../context/UserContext';

import FriendProps from '../../types/FriendTypes';
import LoadSymbol from '../shared/LoadSymbol';
import UpdatePSNButton from './UpdatePSNButton';

import getAllUserFriends from '../../services/friends/getAllUserFriends';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const Friends: FC = () => {
  const [friendList, setFriendList] = useState<FriendProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
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
            <UpdatePSNButton
              userId={state.id}
              fetchData={fetchData}
            />
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