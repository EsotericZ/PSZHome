import { Box, Typography } from '@mui/material';
import { router } from '../../App';

const Logo = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1200,
      }}
    >
      <Typography 
        variant='h3'
        onClick={() => {router.navigate({ to: '/' })}}
        sx={{
          cursor: 'pointer'
        }}
      >
        PSZ Reviews
      </Typography>
    </Box>
  );
}

export default Logo;