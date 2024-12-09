import { createLazyFileRoute } from '@tanstack/react-router';
import { Box } from '@mui/material';

export const Route = createLazyFileRoute('/library/')({
  component: Library,
})

function Library() {
  return (
    <Box>
      <h3>Library</h3>
    </Box>
  )
}
