import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Box, Backdrop, SpeedDial, SpeedDialAction } from '@mui/material';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import GamesIcon from '@mui/icons-material/Games';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';

import LogoutComponent from '../portal/LogoutComponent';

const actions = [
  { icon: <PersonIcon />, name: 'Profile', link: '/profile' },
  { icon: <GamesIcon />, name: 'Library', link: '/library' },
  { icon: <AddShoppingCartIcon />, name: 'Wishlist', link: '/wishlist' },
  { icon: <LogoutIcon />, name: 'Logout', link: null },
  { icon: <SettingsIcon />, name: 'Admin', link: '/admin' },
];

interface User {
  avatar?: string;
  name: string;
};

const user: User = {
  avatar: '',
  name: 'CJ',
};

const ProfileBar = () => {
  const [open, setOpen] = useState(false);
  const firstLetter = user.name.charAt(0).toUpperCase();

  const handleActionClick = (action: typeof actions[number]) => {
    if (action.name === 'Logout') {
      LogoutComponent();
    } else if (action.link) {
      window.location.href = action.link;
    }
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 16,
        right: 16,
        zIndex: 1200, 
      }}
    >
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel='SpeedDial basic example'
        sx={{
          position: 'relative',
          '& .MuiSpeedDial-fab': {
            background: 'none',
            boxShadow: 'none',
            width: 56,
            height: 56,
            '&:hover': {
              background: 'none',
            },
          },
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        icon={
          user.avatar ? (
            <Box
              component='img'
              src={user.avatar}
              alt='User Avatar'
              sx={{ 
                width: '100%', 
                height: '100%', 
                borderRadius: '50%',
                objectFit: 'cover',
              }}
            />
          ) : (
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#6A0DAD',
                color: '#FFFFFF',
                fontSize: '20px',
                fontWeight: 'bold',
              }}
            >
              {firstLetter}
            </Box>
          )
        }
        direction={'down'}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={(e) => {
              e.stopPropagation();
              handleActionClick(action);
              setOpen(false);
            }}
          />
        ))}
      </SpeedDial>
    </Box>
  );
};

export default ProfileBar;