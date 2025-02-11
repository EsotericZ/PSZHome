import { Box } from '@mui/material';
import { PuffLoader } from 'react-spinners';

function LoadSymbol() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: '100vh',
        marginTop: '33vh',
      }}
    >
      <PuffLoader
        color='white'
      />
    </Box>

  );
}

export default LoadSymbol;