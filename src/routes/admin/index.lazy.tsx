import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/admin/')({
  component: Admin,
})

function Admin() {
  return (
    <>
      <h3>Admin</h3>
    </>
  )
}