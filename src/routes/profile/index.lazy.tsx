import { createLazyFileRoute } from '@tanstack/react-router';
import { Box } from '@mui/material';

import { useUserContext } from '../../context/UserContext';

export const Route = createLazyFileRoute('/profile/')({
  component: Profile,
});

function Profile() {
  const { state } = useUserContext();

  return (
    <Box>
      <h3>Profile</h3>
      <p>Email: {state.email}</p>
      <p>PSN: {state.psn}</p>
      <p>Role: {state.role}</p>
      <p>Verified: {state.verified}</p>
    </Box>
  );
}