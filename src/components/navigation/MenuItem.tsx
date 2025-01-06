import { FC, ReactNode } from 'react';
import { Box } from '@mui/material';
import { Link } from '@tanstack/react-router';

interface MenuItemProps {
  to: string;
  color: string;
  handleClick?: () => void;
  children: ReactNode;
}

const MenuItem: FC<MenuItemProps> = ({ to, color, handleClick, children }) => {
  return (
    <Box
      component={Link}
      to={to}
      onClick={(e) => {
        e.stopPropagation();
        if (handleClick) handleClick();
      }}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        textDecoration: 'none',
        color: color,
      }}
    >
      {children}
    </Box>
  );
}

export default MenuItem;