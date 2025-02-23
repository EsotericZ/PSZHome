import { FC, useEffect, useState } from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';

import { useUserContext } from '../../context/UserContext';

import LoadSymbol from '../shared/LoadSymbol';
import SearchBar from '../shared/SearchBar';
import WishlistProps from '../../types/WishlistTypes';
import WishlistCard from './WishlistCard';

import getUserWishlist from '../../services/wishlist/getUserWishlist';
import updateBacklog from '../../services/backlog/updateBacklog';
import updateWishlist from '../../services/wishlist/updateWishlist';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const Wishlist: FC = () => {
  const [wishlist, setWishlist] = useState<WishlistProps[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const { state } = useUserContext();
  const apiPrivate = useAxiosPrivate();
  const isMobile = useMediaQuery('(max-width:600px)');

  const filteredGames = wishlist.filter((game) =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleWishlist = async (igdbId: number) => {
    if (!state.id) {
      console.error('User ID is null. Cannot update backlog.');
      return;
    }
    try { 
      await updateWishlist(apiPrivate, igdbId, state.id)
    } catch (error) {
      console.error(error);
    } finally {
      fetchData();
    }
  };

  const toggleBacklog = async (igdbId: number) => {
    console.log(`Backlog Clicked: ${igdbId}`);

    if (!state.id) {
      console.error('User ID is null. Cannot update backlog.');
      return;
    }

    try { 
      await updateBacklog(apiPrivate, igdbId, state.id)
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = () => {
    console.log('hit open')
  };

  const fetchData = async () => {
    if (!state.id) {
      console.warn('UserID Not Available');
      return;
    }

    try {
      const wishlistData = await getUserWishlist(apiPrivate, state.id);
      setWishlist(wishlistData);
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
                placeholder='Search Games...'
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 5,
                justifyContent: "center",
                alignItems: "stretch",
                maxWidth: "100%",
                margin: "0 auto",
              }}
            >
              {filteredGames.map((game, index) => (
                <WishlistCard
                  key={index}
                  game={game}
                  toggleWishlist={toggleWishlist}
                  toggleBacklog={toggleBacklog}
                  openModal={openModal}
                />
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

export default Wishlist;