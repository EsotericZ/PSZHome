import { createContext, FC, ReactNode } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

const darkTheme = {
  background: "#151718",
  text: "#fff",
  iconActive: "#9BA1A6",
  iconInactive: "#2d2d2d",
  button: "#6B6B6B",
  primary: "#2d2d2d",
  secondary: "#FF8C00",
  success: "#28A745",
  danger: "#FF6347",
  warning: "#FFCC00",
  info: "#6495ED",
};

interface ThemeContextProps {
  theme: typeof darkTheme;
};

export const ThemeContext = createContext<ThemeContextProps | undefined>(
  undefined
);

interface ThemeProviderProps {
  children: ReactNode;
};

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
};