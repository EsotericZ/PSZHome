import { useState } from 'react';
import { Backdrop, Box, SpeedDial, SpeedDialAction } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import { useUserContext } from '../../context/UserContext';
import { router } from '../../App';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import GamesIcon from '@mui/icons-material/Games';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';

interface User {
  avatar?: string;
  name: string;
};

const user: User = {
  avatar: '',
  name: 'CJ',
};

const ProfileBar = () => {
  const { logout } = useAuth0();
  const { dispatch, state } = useUserContext();
  const [open, setOpen] = useState(false);
  const firstLetter = user.name.charAt(0).toUpperCase();

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
    localStorage.removeItem('pszToken');
    localStorage.removeItem('userState');
    dispatch({ type: 'RESET_USER' });
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
        ariaLabel='SpeedDial'
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
                backgroundColor: (theme) => theme.palette.primary.main,
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
        <SpeedDialAction
          key='Profile'
          icon={<PersonIcon />}
          tooltipTitle='Profile'
          onClick={(e) => {
            e.stopPropagation();
            setOpen(false);
            router.navigate({ to: '/profile' });
          }}
        />
        <SpeedDialAction
          key='Library'
          icon={<GamesIcon />}
          tooltipTitle='Library'
          onClick={(e) => {
            e.stopPropagation();
            setOpen(false);
            router.navigate({ to: '/library' });
          }}
        />
        <SpeedDialAction
          key='Reviews'
          icon={<AddShoppingCartIcon />}
          tooltipTitle='Reviews'
          onClick={(e) => {
            e.stopPropagation();
            setOpen(false);
            router.navigate({ to: '/' });
          }}
        />
        <SpeedDialAction
          key='Logout'
          icon={<LogoutIcon />}
          tooltipTitle='Logout'
          onClick={(e) => {
            e.stopPropagation();
            setOpen(false);
            handleLogout();
          }}
        />
        {state.role === 1089 &&
          <SpeedDialAction
            key='Admin'
            icon={<SettingsIcon />}
            tooltipTitle='Admin'
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
              router.navigate({ to: '/admin' });
            }}
          />
        }
      </SpeedDial>
    </Box>
  );
};

export default ProfileBar;