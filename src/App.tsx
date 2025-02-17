import { FC } from 'react';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const router = createRouter({ 
  routeTree,
  defaultPreload: 'intent',
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const App: FC = () => {
  return (
    <>
      <ToastContainer position='bottom-right' autoClose={3000} />
      <RouterProvider router={router} />
    </>
  )
}

export default App;