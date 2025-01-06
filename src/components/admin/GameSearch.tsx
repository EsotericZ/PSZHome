import { FC } from 'react';
import { Box, TextField } from '@mui/material';

interface GameSearchProps {
  onSearch: (value: string) => void;
}

const GameSearch: FC<GameSearchProps> = ({ onSearch }) => {
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 3,
      }}
    >
      <TextField
        label="Game Search"
        variant="outlined"
        fullWidth
        onChange={(e) => onSearch(e.target.value)}
        sx={{
          maxWidth: 400,
          input: { color: 'white' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'white',
            },
            '&:hover fieldset': {
              borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'white',
            },
          },
          '& .MuiInputLabel-root': {
            color: 'white',
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: 'white',
          },
        }}
      />
    </Box>
  );
}

export default GameSearch;