import { Box, Typography } from '@mui/material';

interface SideBoxProps {
  name: string;
  color: string;
}

const SideBox = ({name, color}: SideBoxProps) => {
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

export default SideBox;