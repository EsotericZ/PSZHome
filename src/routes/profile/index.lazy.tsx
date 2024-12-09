import { createLazyFileRoute } from '@tanstack/react-router';
import { Box } from '@mui/material';

import { useUserContext } from '../../context/UserContext';

export const Route = createLazyFileRoute('/profile/')({
  component: Profile,
});

function Profile() {
  const { email, psn, role, verified } = useUserContext();

  return (
    <Box>
      <h3>Profile</h3>
      <p>Email: {email}</p>
      <p>PSN: {psn}</p>
      <p>Role: {role}</p>
      <p>Verified: {verified}</p>
    </Box>
  );
}