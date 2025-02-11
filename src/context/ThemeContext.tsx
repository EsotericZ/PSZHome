import { createContext, FC, ReactNode } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

const darkTheme = {
  background: '#1E1E1E',
  text: '#EFE4D3',
  iconActive: '#E673CF',
  iconInactive: '#2D2D2D',
  button: '#6A0DAD',
  primary: '#6A0DAD',
  secondary: '#F5C518',
  success: '#28A745',
  danger: '#FF6347',
  warning: '#535485',
  info: '#E673CF',
}

// plat: #E5E4E2 
// gold: #D4AF37 
// silver: #C0C0C0 
// bronze: #8C7853 

interface ThemeContextProps {
  theme: typeof darkTheme;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(
  undefined
);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const muiTheme = createTheme({
    palette: {
      background: {
        default: darkTheme.background,
      },
      text: {
        primary: darkTheme.text,
      },
      primary: {
        main: darkTheme.primary,
      },
      secondary: {
        main: darkTheme.secondary,
      },
      success: {
        main: darkTheme.success,
      },
      error: {
        main: darkTheme.danger,
      },
      warning: {
        main: darkTheme.warning,
      },
      info: {
        main: darkTheme.info,
      },
    },
    components: {
      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundColor: darkTheme.background,
          },
        },
      },
    },
  });

  return (
    <ThemeContext.Provider value={{ theme: darkTheme }}>
      <MuiThemeProvider theme={muiTheme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}