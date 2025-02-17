import { FC } from 'react';
import { Avatar, Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';

import bronzeTrophyIcon from '../../../assets/trophies/bronze.png';
import goldTrophyIcon from '../../../assets/trophies/gold.png';
import platinumTrophyIcon from '../../../assets/trophies/platinum.png';
import silverTrophyIcon from '../../../assets/trophies/silver.png';

interface TrophyCardProps {
  trophy: {
    id: number;
    name: string;
    image: string;
    earned: boolean;
    type: 'bronze' | 'silver' | 'gold' | 'platinum';
  };
}

const TrophyContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '12px',
  borderBottom: '1px solid #444',
  width: '100%', 
});

const TrophyIcon = {
  bronze: bronzeTrophyIcon,
  silver: silverTrophyIcon,
  gold: goldTrophyIcon,
  platinum: platinumTrophyIcon,
};

const TrophyCard: FC<TrophyCardProps> = ({ trophy }) => {
  return (
    <TrophyContainer>
      <Avatar src={trophy.image} variant="square" sx={{ width: 48, height: 48, borderRadius: '8px' }} />
  
      <Typography sx={{ flex: 2, ml: 2, minWidth: 150 }}>{trophy.name}</Typography>
  
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        {!trophy.earned && (
          <Button variant="outlined" color="secondary">
            Request Help
          </Button>
        )}
      </Box>
  
      <Box sx={{ width: 48, textAlign: 'center' }}>
        {trophy.earned && <Avatar src={TrophyIcon[trophy.type]} sx={{ width: 32, height: 32 }} />}
      </Box>
    </TrophyContainer>
  );
  
};

export default TrophyCard;