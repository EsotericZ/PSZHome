import { FC } from 'react';
import { Box } from '@mui/material';
import { useUserContext } from '../../context/UserContext';

import ProfileCard from './ProfileCard';
import UpdatePSNButton from './UpdatePSNButton';

const ProfileInfo: FC = () => {
  const { state } = useUserContext();

  return (
    <>
      {state.verified && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
          <UpdatePSNButton
            userId={state.id}
          />
        </Box>
      )}
      <ProfileCard />
    </>
  )
}

export default ProfileInfo;