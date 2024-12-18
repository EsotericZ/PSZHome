import { useState } from 'react';
import { Box, Backdrop, SpeedDial, SpeedDialAction } from '@mui/material';

import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';

const actions = [
  { icon: <FileCopyIcon />, name: 'Copy' },
  { icon: <SaveIcon />, name: 'Save' },
  { icon: <PrintIcon />, name: 'Print' },
  { icon: <ShareIcon />, name: 'Share' },
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
          />
        ))}
      </SpeedDial>
    </Box>
  );
};

export default ProfileBar;