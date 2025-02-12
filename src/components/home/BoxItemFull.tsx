import { Box, Typography } from '@mui/material';

import LoadSymbol from '../shared/LoadSymbol';

interface BoxItemFullProps {
  box: any;
  index: number;
  isMobile: boolean;
  loading: boolean;
  handleBoxClick: (index: number) => void;
}

const BoxItemFull = ({ box, index, isMobile, loading, handleBoxClick }: BoxItemFullProps) => {
  return (
    <Box
      sx={{
        flexBasis: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: isMobile ? 'default' : 'pointer',
        position: 'relative',
        height: 'auto',
      }}
      onClick={() => handleBoxClick(index)}
    >
      {loading ? (
        <LoadSymbol />
      ) : (
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            '&:hover img': { opacity: 0.3 },
            '&:hover .box-text': { opacity: 1 },
          }}
        >
          <img
            src={box.image}
            alt={box.name}
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '8px',
              boxShadow: '0px 0px 10px rgba(255, 255, 255, 0.3)',
              transition: 'opacity 0.3s ease-in-out',
            }}
          />
          <Typography
            className="box-text"
            variant="h6"
            sx={{
              position: 'absolute',
              color: 'white',
              fontWeight: 'bold',
              textShadow: '2px 2px 5px black',
              opacity: 0,
              transition: 'opacity 0.3s ease-in-out',
            }}
          >
            {box.name}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default BoxItemFull;