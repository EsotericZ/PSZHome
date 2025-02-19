import { FC, useEffect, useState } from 'react';
import { Box, Typography, useMediaQuery  } from '@mui/material';

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
  const isMobile = useMediaQuery('(max-width:600px)');

  const filteredFriends = friendList.filter((friend) =>
    friend.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchData = async (): Promise<void> => {
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
            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: isMobile ? 'center' : 'space-between',
                alignItems: 'center', 
                gap: 2,
                mb: isMobile ? 1 : 2,
                maxWidth: '600px',
                mx: 'auto',
              }}
            >
              <SearchBar 
                value={searchTerm} 
                onChange={setSearchTerm} 
                placeholder='Search Friends...'
              />
              <Box sx={{ mt: isMobile ? 0 : 2 }}>
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
                <Box key={index} sx={{ flex: '1 1 275px', maxWidth: '300px' }}>
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