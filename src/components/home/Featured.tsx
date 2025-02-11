import { Box, Typography } from '@mui/material';

interface FeaturedProps {
  name: string;
  color: string;
}

const Featured = ({name, color}: FeaturedProps) => {
  return (
    <Box
      sx={{
        height: 150,
        backgroundColor: color,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant='body1' color='white'>
        {name}
      </Typography>
    </Box>
  );
}

export default Featured;