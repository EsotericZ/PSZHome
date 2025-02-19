import { FC, useState } from 'react';
import { Box, Card, CardContent, Typography, Avatar, IconButton, Tooltip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddCircleIcon from '@mui/icons-material/AddCircle';

interface Game {
  id: string;
  gameId: number;
  name: string;
  cover?: string;
  esrb?: string;
  rating?: number;
  released?: string;
  slug?: string;
  genres?: { id: number; name: string }[];
  storyline?: string;
  summary?: string;
  pszRating?: number;
  userRating?: { average: number; count: number };
}

interface GameCardProps {
  game: Game;
  isFavorite?: boolean;
  onFavoriteToggle?: () => void;
  onAddClick?: () => void;
}

const GameCard: FC<GameCardProps> = ({ 
  game, 
  isFavorite = fals
  onFavoriteToggle, 
  onAddClick 
}) => {
  const [favorite, setFavorite] = useState(isFavorite);

  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        maxWidth: 500,
        padding: 2,
        backgroundColor: '#222',
        color: 'white',
        borderRadius: '8px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
      }}
    >
      {/* Cover Image */}
      <Avatar
  src={
    game.cover 
      ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover}.jpg`
      : '/default-cover.jpg'
  }
  variant="square"
  sx={{ width: 80, height: 80, borderRadius: '8px', mr: 2 }}
/>

      {/* Game Info */}
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography variant="h6" fontWeight="bold">
          {game.name}
        </Typography>

        {/* Ratings */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" color="gray">PSZ Score</Typography>
            <Typography variant="h6">{game.pszRating || 'N/A'}</Typography>
          </Box>

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" color="gray">User Score</Typography>
            <Typography variant="h6">{game.userRating?.average || 'N/A'}</Typography>
            <Typography variant="body2" color="gray">{game.userRating?.count || 0} Users</Typography>
          </Box>
        </Box>

        {/* Additional Info */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant="body2" color="gray">
            {game.esrb || 'No Rating'}
          </Typography>
          <Typography variant="body2" color="gray">
            {game.released || 'Unknown Release'}
          </Typography>
        </Box>
      </CardContent>

      {/* Actions */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Tooltip title="Add to Collection">
          <IconButton onClick={onAddClick} color="primary">
            <AddCircleIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title={favorite ? "Remove from Favorites" : "Add to Favorites"}>
          <IconButton
            onClick={() => {
              setFavorite(!favorite);
              if (onFavoriteToggle) onFavoriteToggle();
            }}
            color={favorite ? "error" : "default"}
          >
            <FavoriteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Card>
  );
};

export default GameCard;