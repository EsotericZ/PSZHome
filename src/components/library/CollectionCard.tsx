import { FC } from 'react';
import { Avatar, Box, Card, LinearProgress, Typography } from '@mui/material';
import { styled } from '@mui/system';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import CollectionProps from '../../types/CollectionTypes';
import TrophyCard from './TrophyCard';

import bronzeTrophyIcon from '../../../assets/trophies/bronze.png';
import goldTrophyIcon from '../../../assets/trophies/gold.png';
import platinumTrophyIcon from '../../../assets/trophies/platinum.png';
import silverTrophyIcon from '../../../assets/trophies/silver.png';

interface CollectionCardProps {
  game: CollectionProps;
  expandedCardId: string | null;
  setExpandedCardId: (id: string | null) => void;
}

const StyledCard = styled(Card)(({ theme }) => ({
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

  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    minWidth: '100%',
    padding: '12px',
  },
}));

const TrophyIcon = styled(Avatar)({
  width: 24,
  height: 24,
  marginRight: 4,
});

const CollectionCard: FC<CollectionCardProps> = ({ game, expandedCardId, setExpandedCardId }) => {
  const expanded = expandedCardId === game.id;

  return (
    <Box sx={{ width: '100%' }}>
      <StyledCard
        sx={{
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'center', md: 'center' },
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flex: 1,
            minWidth: 250,
            maxWidth: 300,
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 1, md: 0 },
          }}
        >
          <Avatar
            src={game.image}
            variant='square'
            sx={{
              width: 64,
              height: 64,
              borderRadius: '8px',
            }}
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
              ml: 1
            }}
          >
            {game.name}
          </Typography>
        </Box>

        <Box sx={{ flex: 1 }} />

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flex: 1,
            minWidth: 200,
            flexDirection: 'row',
            gap: { xs: 2, md: 3 },
            justifyContent: { xs: 'center', md: 'flex-start' }, 
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              minWidth: 160,
              maxWidth: 200,
              flex: 1,
            }}
          >
            <LinearProgress
              variant="determinate"
              value={game.progress}
              sx={{
                width: '100%',
                height: 8,
                borderRadius: '4px',
                backgroundColor: '#444',
              }}
            />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                mt: 1,
                gap: 1,
                justifyContent: 'center',
              }}
            >
              <TrophyIcon src={goldTrophyIcon} />
              <Typography>{game.earnedTrophies.gold}</Typography>

              <TrophyIcon src={silverTrophyIcon} />
              <Typography>{game.earnedTrophies.silver}</Typography>

              <TrophyIcon src={bronzeTrophyIcon} />
              <Typography>{game.earnedTrophies.bronze}</Typography>
            </Box>
          </Box>

          <Box
            sx={{
              textAlign: 'center',
            }}
          >
            {game.platinum ? (
              <TrophyIcon src={platinumTrophyIcon} />
            ) : (
              <Typography fontSize={20} color="gray">X</Typography>
            )}
          </Box>
        </Box>


        <Box sx={{ flex: 1 }} />

        <Box
          sx={{
            flex: 1,
            textAlign: 'center',
            minWidth: 100,
            mt: { xs: 1, md: 0 },
          }}
        >
          <Typography>{game.status}</Typography>
        </Box>

        <Box sx={{ flex: 1 }} />

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flex: 1,
            justifyContent: 'flex-end',
            minWidth: 120,
            mt: { xs: 1, md: 0 },
          }}
        >
          <Typography color='gray'>Not Rated</Typography>
          <ExpandMoreIcon
            sx={{
              cursor: 'pointer',
              color: 'white',
              ml: 1,
              mr: 0,
            }}
            onClick={() => setExpandedCardId(expanded ? null : game.id)}
          />
        </Box>
      </StyledCard>

      {expanded && (
        <Box
          sx={{
            width: '100%',
            margin: '4px auto',
            backgroundColor: '#333',
            borderRadius: '8px',
            padding: '8px 16px',
          }}
        >
          {game.trophies.map((trophy, index) => (
            <TrophyCard 
              key={index} 
              trophy={trophy} 
            />
          ))}
        </Box>
      )}

    </Box>
  );
};

export default CollectionCard;