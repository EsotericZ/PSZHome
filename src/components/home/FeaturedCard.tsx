import { FC } from 'react';
import { Box, Card, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import { Favorite, FavoriteBorder, List, ListAlt } from '@mui/icons-material';

import FeaturedProps from '../../types/FeaturedTypes';

interface FeaturedCardProps {
  game: FeaturedProps;
  updateWishlist: (gameId: string, inWishlist: boolean) => void;
  updateBacklog: (gameId: string, inBacklog: boolean) => void;
  openModal: (game: FeaturedProps) => void;
}

const getGlowColor = (rating?: number) => {
  if (rating === undefined || rating === null) return 'none';
  if (rating >= 90) return '0 0 15px #8fa6c6';
  if (rating >= 75) return '0 0 15px #D4AF37';
  if (rating >= 50) return '0 0 15px #C0C0C0';
  return '0 0 15px #8C7853';
};

const FeaturedCard: FC<FeaturedCardProps> = ({ game, updateWishlist, updateBacklog, openModal }) => {
  const userScore = game.ratingCount > 0 ? (game.totalRating / game.ratingCount).toFixed(1) : 'N/A';

  return (
    <Card
      sx={{
        maxWidth: 600,
        bgcolor: '#222',
        color: '#fff',
        borderRadius: 2,
        p: 2,
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

      {game.collection ? (
        <Typography variant='body2' color='success.main' fontWeight='bold'>
          In User Library
        </Typography>
      ) : (
        <Box display='flex' justifyContent='center' gap={2} mt={2}>
          <IconButton onClick={() => updateWishlist(game.gameId, game.wishlist)} color='error'>
            {game.wishlist ? <Favorite fontSize='large' /> : <FavoriteBorder fontSize='large' />}
          </IconButton>

          <IconButton onClick={() => updateBacklog(game.gameId, game.backlog)} color='info'>
            {game.backlog ? <ListAlt fontSize='large' /> : <List fontSize='large' />}
          </IconButton>
        </Box>
      )}
    </CardContent>
  </Card>
  );
};

export default FeaturedCard;