import { Box, Typography } from '@mui/material';

interface BoxItemSmallProps {
  box: any;
  index: number;
  handleBoxClick: (index: number) => void;
}

const BoxItemSmall = ({ box, index, handleBoxClick }: BoxItemSmallProps) => {
  return (
    <Box
      sx={{
        flexBasis: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer', 
        position: 'relative',
        height: '100px',
        background: 'linear-gradient(135deg, #28242F 0%, #4A0D66 50%, #7A3E7A 100%)',
        borderRadius: '8px',
        boxShadow: '0px 0px 10px rgba(255, 255, 255, 0.3)',
      }}
      onClick={() => handleBoxClick(index)}
    >
      <Typography
        variant='h6'
        sx={{
          color: 'white',
          fontWeight: 'bold',
          textShadow: '2px 2px 5px black',
        }}
      >
        {box.name}
      </Typography>
    </Box>
  );
}

export default BoxItemSmall;