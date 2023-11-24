import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import MainLayout from './MainLayout/MainLayout.jsx';
import ErrorPage from './Pages/ErrorPage/ErrorPage.jsx';
import Home from './Pages/HomePage/Home.jsx';
import AuthProvider from './Firebase/AuthProvider.jsx';
import AllProperties from './Pages/AllPropertiesPage/AllProperties.jsx';
import Dashboard from './Pages/DashBoard/Dashboard.jsx';
import Login from './Pages/Login/Login.jsx';
import Registration from './Pages/RegistrationPage/Registration.jsx';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import DetailsPage from './Pages/DetailsPage/DetailsPage.jsx';
import PrivateRoute from './Firebase/PrivateProvider.jsx';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/allProperties",
        element: <PrivateRoute> <AllProperties></AllProperties> </PrivateRoute>
      },
      {
        path: "/dashboard",
        element: <PrivateRoute> <Dashboard></Dashboard> </PrivateRoute>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/registration",
        element: <Registration></Registration>
      },
      {
        path: "/allProperties/:_id",
        element: <PrivateRoute><DetailsPage></DetailsPage></PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:5000/property/${params._id}`)
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
)
