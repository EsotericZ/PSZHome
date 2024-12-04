import { FC } from 'react';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
// MOVE THE AUTH BUTTONS TO ROOT
import AuthButtons from './components/AuthButtons';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const App: FC = () => {
  return (
    <>
      <AuthButtons />
      <RouterProvider router={router} />
    </>
  )
}

export default App;