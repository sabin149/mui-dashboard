import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import RootLayout from 'layouts/RootLayout';
import { Typography } from '@mui/material';
import Home from 'pages/Home';

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path='auth/login' element={<h1>login Page</h1>} />
      <Route
        path='*'
        element={
          <Typography textAlign='center' variant='h5'>
            Page Not Found Page
          </Typography>
        }
      />
    </Route>
  )
);

export default Router;
