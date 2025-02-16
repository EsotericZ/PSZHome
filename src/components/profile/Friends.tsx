import { FC, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

import { useUserContext } from '../../context/UserContext';

import FriendCard from './FriendCard';
import FriendProps from '../../types/FriendTypes';
import LoadSymbol from '../shared/LoadSymbol';
import SearchBar from '../shared/SearchBar';
import UpdatePSNButton from './UpdatePSNButton';

import getAllUserFriends from '../../services/friends/getAllUserFriends';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const Friends: FC = () => {
  const [friendList, setFriendList] = useState<FriendProps[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const { state } = useUserContext();
  const apiPrivate = useAxiosPrivate();

  const filteredFriends = friendList.filter((friend) =>
    friend.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchData = async (): Promise<{ psnAvatar?: string | null; psnPlus?: boolean }> => {
    if (!state.id) {
      console.warn('UserID Not Available');
      return { psnAvatar: state.psnAvatar, psnPlus: state.psnPlus };
    }

    try {
      const friendData = await getAllUserFriends(apiPrivate, state.id);
      setFriendList(friendData);

      return { psnAvatar: state.psnAvatar, psnPlus: state.psnPlus };
    } catch (error) {
      console.error(error);
      return { psnAvatar: state.psnAvatar, psnPlus: state.psnPlus };
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
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                gap: 2, 
                mb: 2,
              }}
            >
              <SearchBar 
                value={searchTerm} 
                onChange={setSearchTerm} 
                placeholder='Search Friends...'
              />
              <Box sx={{ mt: 2 }}>
                <UpdatePSNButton
                  userId={state.id}
                  fetchData={fetchData}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 2,
                justifyContent: 'center',
                alignItems: 'center',
                maxWidth: '1000px',
                margin: '0 auto',
              }}
            >
              {filteredFriends.map((friend, index) => (
                <Box key={index} sx={{ flex: '1 1 250px', maxWidth: '300px' }}>
                  <FriendCard friend={friend} />
                </Box>
              ))}
            </Box>
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