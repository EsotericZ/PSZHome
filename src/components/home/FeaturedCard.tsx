import { FC } from 'react';
import { Box, Card, CardContent, CardMedia, IconButton, Tooltip, Typography } from '@mui/material';
import { Favorite, FavoriteBorder, QueryBuilder, WatchLater } from '@mui/icons-material';

import FeaturedProps from '../../types/FeaturedTypes';

interface FeaturedCardProps {
  game: FeaturedProps;
  toggleWishlist: (igdbId: number) => void;
  toggleBacklog: (igdbId: number) => void;
  openModal: (game: FeaturedProps) => void;
}

const getGlowColor = (rating?: number) => {
  if (rating === undefined || rating === null) return 'none';
  if (rating >= 90) return '0 0 15px #8fa6c6';
  if (rating >= 75) return '0 0 15px #D4AF37';
  if (rating >= 50) return '0 0 15px #C0C0C0';
  return '0 0 15px #8C7853';
};

const FeaturedCard: FC<FeaturedCardProps> = ({ game, toggleWishlist, toggleBacklog, openModal }) => {
  const userScore = game.ratingCount > 0 ? (game.totalRating / game.ratingCount).toFixed(1) : 'N/A';
  console.log(game)

  return (
    <Card
      sx={{
        width: 350,
        minWidth: 300,
        bgcolor: '#222',
        color: '#fff',
        borderRadius: 2,
        mx: 'auto',
        boxShadow: getGlowColor(game.igdbRating),
        transition: 'box-shadow 0.3s ease-in-out',
      }}
    >
      <CardMedia
        component='img'
        height={350}
        image={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover}.jpg`}
        alt={game.name}
        sx={{
          borderRadius: 1,
          cursor: 'pointer',
          objectFit: 'cover',
        }}
        onClick={() => openModal(game)}
      />

    <CardContent sx={{ textAlign: 'center', p: 2 }}>
      <Typography variant='h5' sx={{ fontWeight: 'bold', mb: 1 }}>
        {game.name}
      </Typography>

      <Box display='flex' justifyContent='space-between' sx={{ fontSize: 16, mb: 2 }}>
        <Box>
          <Typography variant='body2' color='gray'>PSZ Score</Typography>
          <Typography variant='body1' fontWeight='bold'>
            {game.pszRating ? game.pszRating.toFixed(1) : 'N/A'}
          </Typography>
        </Box>
        <Box>
          <Typography variant='body2' color='gray'>User Score</Typography>
          <Typography variant='body1' fontWeight='bold'>{userScore}</Typography>
          {game.ratingCount > 0 && (
            <Typography variant='caption' color='gray'>{game.ratingCount} ratings</Typography>
          )}
        </Box>
      </Box>

      <Box display='flex' justifyContent='center' gap={2} mt={2}>
        {game.collection ? (
          <Typography variant='body1' color='success.main' fontWeight='bold' fontSize={20}>
            In User Library
          </Typography>
        ) : (
          <>
            <Tooltip title={game.wishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}>
              <IconButton onClick={() => toggleWishlist(game.igdbId)} color='error'>
                {game.wishlist ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
            </Tooltip>

            <Tooltip title={game.backlog ? 'Remove from Backlog' : 'Add to Backlog'}>
              <IconButton onClick={() => toggleBacklog(game.igdbId)} color='info'>
                {game.backlog ? <WatchLater /> : <QueryBuilder />}
              </IconButton>
            </Tooltip>
          </>
        )}
      </Box>
    </CardContent>
  </Card>
  );
};

export default FeaturedCard;