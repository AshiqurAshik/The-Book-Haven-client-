import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import Root from './Components/Root/Root';
import Home from './Pages/Homepage/Home/Home';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import AuthProvider from './Auth/AuthProvider';
import AllBooks from './Pages/AllBooks/AllBooks';
import AddBook from './Pages/Add Book/AddBook';
import MyBook from './Pages/My book/MyBook';
import PrivateRoute from './Components/Private Route/PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root></Root>,

    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: '/all-books',
        element: <PrivateRoute>
          <AllBooks></AllBooks>
        </PrivateRoute>
      },
      {
        path: '/add-book',
         element: <PrivateRoute>
          <AddBook></AddBook>
        </PrivateRoute>
      },
      {
        path: '/my-books',
         element: <PrivateRoute>
          <MyBook></MyBook>
        </PrivateRoute>
      },
    ],
  },

  {
    path: '/login',
    Component: Login,
  },

  {
    path: '/register',
    Component: Register,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
