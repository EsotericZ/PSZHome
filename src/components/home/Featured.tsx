import { Box, Typography } from '@mui/material';
import FeaturedProps from '../../types/FeaturedTypes';

const Featured = ({ featured }: { featured?: FeaturedProps }) => {
  if (!featured) return null;

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      <img
        src={featured.image}
        alt={featured.name}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'brightness(50%)',
        }}
      />

      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 1.5,
        }}
      >
        <Typography variant='h3' color='white' fontWeight='bold'>
          {featured.name}
        </Typography>
        <Typography variant='h5' color='white'>
          {featured.description}
        </Typography>
        <Box sx={{ height: 16 }} />
        <Typography variant='h5' color='white'>
          Rating: {featured.rating}
        </Typography>
        <Typography variant='h5' color='white'>
          ESRB: {featured.esrb}
        </Typography>
        <Typography variant='h5' color='white'>
          Released: {featured.released}
        </Typography>
      </Box>
    </Box>

  );
};

export default Featured;