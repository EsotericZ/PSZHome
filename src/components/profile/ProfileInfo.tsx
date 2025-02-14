import { Box } from '@mui/material';

import { useUserContext } from '../../context/UserContext';

const ProfileInfo = () => {
  const { state } = useUserContext();

  return (
    <Box>
      <h3>Profile</h3>
      <p>Email: {state.email}</p>
      <p>ID: {state.id}</p>
      <p>PSN: {state.psn}</p>
      <p>Role: {state.role}</p>
      <p>Verified: {state.verified ? 'Yes' : 'No'}</p>
      <p>Avatar: {state.psnAvatar}</p>
    </Box>
  )
}

export default ProfileInfo;