import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/profile/')({
  component: Profile,
});

function Profile() {
  return (
    <>
      <h3>Profile</h3>
    </>
  );
}