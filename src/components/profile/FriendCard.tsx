import { FC, useState } from 'react';
import { Avatar, Box, Card, Modal, Typography } from '@mui/material';
import { styled } from '@mui/system';

import FriendProps from '../../types/FriendTypes';

const FriendCardContainer = styled(Card)<{ faded: boolean; clickable: boolean }>(
  ({ theme, faded, clickable }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '12px',
    borderRadius: '8px',
    boxShadow: (theme.shadows as unknown as string[])[2] ?? '0px 4px 6px rgba(0, 0, 0, 0.1)',
    backgroundColor: faded ? theme.palette.grey[900] : theme.palette.grey[800],
    color: theme.palette.text.primary,
    transition: 'background-color 0.3s',
    cursor: clickable ? 'pointer' : 'default',
    ...(clickable && {
      '&:hover': {
        backgroundColor: theme.palette.grey[700], 
      },
    }),
  })
);

const FriendAvatar = styled(Avatar)({
  width: 48,
  height: 48,
  marginRight: '12px',
});

const FriendText = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

const FriendUsername = styled(Typography)({
  fontWeight: 'bold',
  textDecoration: 'none',
  cursor: 'pointer',
});

const StatusText = styled(Typography)({
  fontSize: '14px',
  fontStyle: 'italic',
  color: 'grey',
});

const FriendCard: FC<{ friend: FriendProps }> = ({ friend }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <FriendCardContainer
        faded={!friend.pszUser}
        clickable={friend.pszUser}
        onClick={() => friend.pszUser && setOpen(true)}
      >
        <FriendAvatar src={friend.avatarUrl || '/default-avatar.png'} />
        <FriendText>
          <FriendUsername onClick={() => friend.pszUser && setOpen(true)}>
            {friend.username}
          </FriendUsername>
          <StatusText sx={{ color: friend.pszUser ? 'green' : 'grey' }}>
            {friend.pszUser ? 'PSZ User' : 'Not Registered'}
          </StatusText>
        </FriendText>
      </FriendCardContainer>

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
            {friend.username}'s Profile
          </Typography>
          <Typography variant='body2' sx={{ mt: 2 }}>
            More details about {friend.username}...
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default FriendCard;