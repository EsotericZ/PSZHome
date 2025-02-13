import { createLazyFileRoute } from '@tanstack/react-router';
import { Box } from '@mui/material';

import { useUserContext } from '../../context/UserContext';

export const Route = createLazyFileRoute('/library/')({
  component: Library,
})

function Library() {
  const { state } = useUserContext();

  return (
    state.verified ? (
      <Box>
        <h3>Library</h3>
      </Box>
    ) : (
      <Box>
        <h3>Verify Your Profile To Use This Feature</h3>
      </Box>
    )
  )
}