import { FC, useContext } from 'react';
import { TextField, Box } from '@mui/material';

import { ThemeContext } from '../../context/ThemeContext';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar: FC<SearchBarProps> = ({ value, onChange, placeholder = 'Search...' }) => {
  const themeContext = useContext(ThemeContext);
  
  if (!themeContext) {
    throw new Error('ThemeContext must be used within a ThemeProvider');
  }

  const { theme } = themeContext;

  return (
    <Box 
      sx={{ 
        width: '500px'
      }}
    >
      <TextField
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        variant='outlined'
        fullWidth
        sx={{
          input: {
            color: 'white',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: theme.iconInactive,
            },
            '&:hover fieldset': {
              borderColor: theme.iconInactive,
            },
            '&.Mui-focused fieldset': {
              borderColor: theme.iconInactive,
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
};

export default SearchBar;