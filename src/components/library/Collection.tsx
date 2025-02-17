import { FC, useEffect, useState } from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';

import { useUserContext } from '../../context/UserContext';

import LoadSymbol from '../shared/LoadSymbol';
import SearchBar from '../shared/SearchBar';
import UpdatePSNButton from '../profile/UpdatePSNButton';
import CollectionProps from '../../types/CollectionTypes';
import CollectionCard from './CollectionCard';

import getAllUserCollection from '../../services/library/getAllUserCollection';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const Collection: FC = () => {
  const [gamesList, setGamesList] = useState<CollectionProps[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  const { state } = useUserContext();
  const apiPrivate = useAxiosPrivate();
  const isMobile = useMediaQuery('(max-width:600px)');

  const filteredGames = gamesList.filter((game) =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchData = async () => {
    if (!state.id) {
      console.warn('UserID Not Available');
      return { psnAvatar: state.psnAvatar, psnPlus: state.psnPlus };
    }

    try {
      const gameData = await getAllUserCollection(apiPrivate, state.id);
      setGamesList(gameData)
      console.log(gameData)

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
                placeholder='Search Games...'
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
                flexDirection: 'column',
                alignItems: 'center',
                width: '100vw',
                maxWidth: '100%',
                margin: '0 auto',
                px: 2,
              }}
            >
              {filteredGames.map((game, index) => (
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                  <CollectionCard
                    key={index}
                    game={game}
                    expandedCardId={expandedCardId} 
                    setExpandedCardId={setExpandedCardId}
                  />
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

export default Collection;