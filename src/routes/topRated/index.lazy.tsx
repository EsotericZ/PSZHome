import { createLazyFileRoute } from '@tanstack/react-router';
import { Box } from '@mui/material';

export const Route = createLazyFileRoute('/topRated/')({
  component: TopRated,
})

function TopRated() {
  return (
    <Box>
      <h3>Top Rated</h3>
    </Box>
  )
}
