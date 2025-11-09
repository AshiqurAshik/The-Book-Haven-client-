import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';


import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import Root from './Components/Root/Root';
import Home from './Pages/Homepage/Home/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root></Root>,

    children: [
      {
        index: true,
        Component: Home
      },
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
