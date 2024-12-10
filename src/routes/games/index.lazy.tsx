import { createLazyFileRoute } from '@tanstack/react-router';
import { Box } from '@mui/material';

export const Route = createLazyFileRoute('/games/')({
  component: Games,
})

function Games() {
  return (
    <Box>
      <h3>Games</h3>
      <p>do it</p>
    </Box>
  )
}
