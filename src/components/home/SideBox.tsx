import { Box, Typography } from '@mui/material';

interface SideBoxProps {
  name: string;
  height: number;
}

const SideBox = ({name, height}: SideBoxProps) => {
  return (
    <Box
      sx={{
        height: `${height}px`,
        background: `linear-gradient(135deg, #28242F 0%, #4A0D66 50%, #7A3E7A 100%)`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '8px',
        boxShadow: '0px 4px 15px rgba(74, 13, 102, 0.5)',
      }}
    >
      <Typography
        variant='body1'
        sx={{
          color: 'white',
          fontWeight: 'bold',
          textShadow: '2px 2px 5px black',
        }}
      >
        {name}
      </Typography>
    </Box>
  );
}

export default SideBox;