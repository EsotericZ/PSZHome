import { useEffect, useState } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';
import { Box } from '@mui/material';

import { useUserContext } from '../../context/UserContext';

import FriendProps from '../../types/FriendTypes';

import getAllUserFriends from '../../services/friends/getAllUserFriends';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

export const Route = createLazyFileRoute('/friends/')({
  component: Friends,
})

function Friends() {
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
          <p>Loading</p>
        ) : (
          <>
            <h3>Friends</h3>
            {friendList.map((friend, index) => (
              <p key={index}>{friend.pszUser ? 'Y' : 'N'} {friend.username}</p>
            ))}
          </>
        )}
      </Box>
    ) : (
      <Box>
        <h3>Verify Your Profile To Use This Feature</h3>
      </Box>
    )
  )
}
