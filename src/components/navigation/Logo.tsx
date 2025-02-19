import { Box, Typography } from '@mui/material';
import { router } from '../../App';

const Logo = () => {
  return (
    <Box
      sx={{
        display: 'flex', 
        justifyContent: 'center', 
        width: '100%', 
        mt: 2, 
      }}
    >
      <Typography
        variant='h3'
        onClick={() => { router.navigate({ to: '/' }) }}
        sx={{
          cursor: 'pointer'
        }}
      >
        PSZ
      </Typography>
    </Box>
  );
}

export default Logo;