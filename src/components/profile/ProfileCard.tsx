import { useContext, useState } from 'react';
import { Avatar, Box, Button, Card, Modal, Typography, useMediaQuery } from '@mui/material';
import { styled } from '@mui/system';

import { ThemeContext } from '../../context/ThemeContext';
import { useUserContext } from '../../context/UserContext';

const ProfileContainer = styled(Card)(({ theme }) => ({
  display: 'flex',
  alignItems: 'stretch',
  maxWidth: '500px',
  margin: 'auto',
  backgroundColor: theme.palette.grey[800],
  color: theme.palette.text.primary,
  borderRadius: '12px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
  overflow: 'hidden',
  padding: 0,
}));

const AvatarContainer = styled(Box)({
  display: 'flex',
  alignItems: 'stretch',
  height: '100%',
});

const StyledAvatar = styled(Avatar)({
  width: 'auto', 
  height: '180px',
});

const UserDetails = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '16px',
  flex: 1,
});

const VerifiedIcon = styled('span')({
  fontSize: '16px',
  color: 'green',
  fontWeight: 'bold',
});

const UnverifiedButton = styled(Button)({
  textTransform: 'none',
  fontSize: '14px',
  color: '#E673CF',
  cursor: 'pointer',
});

interface UserState {
  psn: string;
  psnAvatar: string;
  role: number;
  email: string;
  verified: boolean;
  accountLevel: string;
}

const getRoleText = (role: number): string => {
  switch (role) {
    case 2001:
      return 'Gamer';
    case 1089:
      return 'Admin';
    case 5151:
      return 'Blogger';
    default:
      return 'User';
  }
};

const ProfileCard = () => {
  const { state } = useUserContext() as { state: UserState };
  const [open, setOpen] = useState<boolean>(false);
  const themeContext = useContext(ThemeContext);
  const isMobile = useMediaQuery('(max-width:600px)');

  if (!themeContext) {
    throw new Error('ThemeContext must be used within a ThemeProvider');
  }

  const { theme } = themeContext;

  return (
    <>
      <ProfileContainer>
        {!isMobile && (
          <AvatarContainer>
            <StyledAvatar src={state.psnAvatar} variant='square' />
          </AvatarContainer>
        )}
        <UserDetails>
          <Typography 
            variant='h5' 
            fontWeight='bold'
            sx={{ mb: 1 }}
          >
            {state.psn}
          </Typography>
          <Typography variant='body1'>
            {getRoleText(state.role)}
          </Typography>
          <Typography variant='body1'>
            {state.email}
          </Typography>
          <Typography variant='body1' sx={{ mb: 1 }}>
            {state.accountLevel.charAt(0).toUpperCase() + state.accountLevel.slice(1)} Account  
            {state.accountLevel === 'standard' && (
              <a 
                href='/upgrade' 
                style={{ 
                  marginLeft: '16px', 
                  color: theme.danger, 
                  textDecoration: 'none', 
                  cursor: 'pointer',
                  fontStyle: 'italic',
                }}
              >
                Upgrade
              </a>
            )}
          </Typography>
          {state.verified ? (
            <VerifiedIcon>
              ✔ Verified
            </VerifiedIcon>
          ) : (
            <UnverifiedButton onClick={() => setOpen(true)}>Get Verified</UnverifiedButton>
          )}
        </UserDetails>
      </ProfileContainer>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: '8px',
          }}
        >
          <Typography variant='h6' fontWeight='bold'>
            Verification Required
          </Typography>
          <Typography variant='body2' sx={{ mt: 2 }}>
            To access all features, please verify your account.
          </Typography>
          <Button
            variant='contained'
            color='primary'
            sx={{ mt: 3 }}
            onClick={() => alert('Verification process initiated')}
          >
            Verify Now
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default ProfileCard;