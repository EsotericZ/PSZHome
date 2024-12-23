import { createLazyFileRoute } from '@tanstack/react-router';
import { Box } from '@mui/material';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <Box>
      <h3>Welcome Home!</h3>
    </Box>
  );
}