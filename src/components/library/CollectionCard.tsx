import { FC } from 'react';
import { Avatar, Box, Card, LinearProgress, Typography } from '@mui/material';
import { styled } from '@mui/system';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import CollectionProps from '../../types/CollectionTypes';

import goldTrophyIcon from '../../../assets/trophies/gold.png';
import silverTrophyIcon from '../../../assets/trophies/silver.png';
import bronzeTrophyIcon from '../../../assets/trophies/bronze.png';
import platinumTrophyIcon from '../../../assets/trophies/platinum.png';

interface CollectionCardProps {
  game: CollectionProps;
}

const StyledCard = styled(Card)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '16px',
  width: '100%',
  maxWidth: '1400px',
  minWidth: '800px',
  margin: '4px auto',
  backgroundColor: '#222',
  color: 'white',
  borderRadius: '12px',
  boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.3)',
});

const TrophyIcon = styled(Avatar)({
  width: 24,
  height: 24,
  marginRight: 4,
});

const CollectionCard: FC<CollectionCardProps> = ({ game }) => {
  return (
    <StyledCard sx={{ display: 'flex', alignItems: 'center' }}>
  
  <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 250, maxWidth: 300 }}> 
    <Avatar
      src={game.image}
      variant='square'
      sx={{ width: 64, height: 64, borderRadius: '8px', mr: 2 }}
    />
    <Typography 
      variant='h6' 
      fontWeight='bold' 
      sx={{ 
        whiteSpace: 'normal',
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 2,
      }}
    >
      {game.name}
    </Typography>
  </Box>

  <Box sx={{ flex: 1 }} />

  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, minWidth: 200 }}>
    <Box sx={{ width: '100%' }}>
      <LinearProgress
        variant='determinate'
        value={game.progress}
        sx={{ width: '100%', height: 8, borderRadius: '4px', backgroundColor: '#444' }}
      />
    </Box>
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 1 }}>
      <TrophyIcon src={goldTrophyIcon} />
      <Typography>{game.earnedTrophies.gold}</Typography>

      <TrophyIcon src={silverTrophyIcon} />
      <Typography>{game.earnedTrophies.silver}</Typography>

      <TrophyIcon src={bronzeTrophyIcon} />
      <Typography>{game.earnedTrophies.bronze}</Typography>
    </Box>
  </Box>

  <Box sx={{ flex: 1 }} />

  <Box sx={{ flex: 1, textAlign: 'center', minWidth: 80 }}>
    {game.platinum ? (
      <TrophyIcon src={platinumTrophyIcon} />
    ) : (
      <Typography fontSize={20} color='gray'>X</Typography>
    )}
  </Box>

  <Box sx={{ flex: 1 }} />

  <Box sx={{ flex: 1, textAlign: 'center', minWidth: 100 }}>
    <Typography>{game.status}</Typography>
  </Box>

  <Box sx={{ flex: 1 }} />

  <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'flex-end', minWidth: 120 }}>
    <Typography color='gray'>Not Rated</Typography>
    <ExpandMoreIcon sx={{ cursor: 'pointer', color: 'white', ml: 1 }} />
  </Box>

</StyledCard>






  );
};

export default CollectionCard;