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
import MyProfile from './Pages/MyProfilePage/MyProfile.jsx';
import Wishlist from './Pages/WishlistPage/Wishlist.jsx';
import PropertyBought from './Pages/PropertyBought/PropertyBought.jsx';
import MyReviews from './Pages/MyReviewsPage/MyReviews.jsx';
import AgentProfile from './Pages/AgentProfile/AgentProfile.jsx';
import MyAddedProperties from './Pages/MyAddedPage/MyAddedProperties.jsx';
import MySoldProperties from './Pages/MySoldPage/MySoldProperties.jsx';
import REquestedProperties from './Pages/RequestedProperties/REquestedProperties.jsx';
import AdminProfile from './Pages/AdminProfile/AdminProfile.jsx';
import ManageProperties from './Pages/ManageProperties/ManageProperties.jsx';
import ManageUsers from './Pages/ManageUsers/ManageUsers.jsx';
import ManageReviews from './Pages/ManageReviewa/ManageReviews.jsx';
import AddProperty from './Pages/AddProperty/AddProperty.jsx';
import Offered from './Pages/WishlistPage/Offered.jsx';
import Payment from './Pages/PropertyBought/Payment.jsx';
import UpdatedProperty from './Pages/MyAddedPage/UpdatedProperty.jsx';

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
      // {
      //   path: "/dashboard",
      //   element: <PrivateRoute> <Dashboard></Dashboard> </PrivateRoute>
      // },
      // {
      //   path: "/dashboard/myProfile",
      //   element: <PrivateRoute> <MyProfile></MyProfile> </PrivateRoute>
      // },
      // {
      //   path: "/dashboard/wishlist",
      //   element: <PrivateRoute> <Wishlist></Wishlist> </PrivateRoute>
      // },
      // {
      //   path: "/dashboard/propertyBought",
      //   element: <PrivateRoute> <PropertyBought></PropertyBought> </PrivateRoute>
      // },
      // {
      //   path: "/dashboard/myReviews",
      //   element: <PrivateRoute> <MyReviews></MyReviews> </PrivateRoute>
      // },
      // {
      //   path: "/dashboard/agentProfile",
      //   element: <PrivateRoute> <AgentProfile></AgentProfile> </PrivateRoute>
      // },
      // {
      //   path: "/dashboard/mySoldProperties",
      //   element: <PrivateRoute> <MyAddedProperties></MyAddedProperties> </PrivateRoute>
      // },
      // {
      //   path: "/dashboard/requestedProperties",
      //   element: <PrivateRoute> <REquestedProperties></REquestedProperties> </PrivateRoute>
      // },
      // {
      //   path: "/dashboard/myAddedProperties",
      //   element: <PrivateRoute> <MySoldProperties></MySoldProperties> </PrivateRoute>
      // },
      // {
      //   path: "/dashboard/adminProfile",
      //   element: <PrivateRoute> <AdminProfile></AdminProfile> </PrivateRoute>
      // },
      // {
      //   path: "/dashboard/manageProperties",
      //   element: <PrivateRoute> <ManageProperties></ManageProperties> </PrivateRoute>
      // },
      // {
      //   path: "/dashboard/manageUsers",
      //   element: <PrivateRoute> <ManageUsers></ManageUsers></PrivateRoute>
      // },
      // {
      //   path: "/dashboard/manageReviews",
      //   element: <PrivateRoute> <ManageReviews></ManageReviews> </PrivateRoute>
      // },
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
  {
    path: "/dashboard",
    element:  <PrivateRoute> <Dashboard></Dashboard> </PrivateRoute>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/dashboard/myProfile",
        element: <PrivateRoute> <MyProfile></MyProfile> </PrivateRoute>
      },
      {
        path: "/dashboard/wishlist",
        element: <PrivateRoute> <Wishlist></Wishlist> </PrivateRoute>
      },


      {
        path: "/dashboard/wishlist/:_id",
        element: <PrivateRoute> <Offered></Offered> </PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:5000/wishedProperty/${params._id}`)
      },

      {
        path: "/dashboard/payment/:_id",
        element: <PrivateRoute> <Payment></Payment> </PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:5000/offeredProperty/${params._id}`)
      },

      {
        path: "/dashboard/propertyBought",
        element: <PrivateRoute> <PropertyBought></PropertyBought> </PrivateRoute>
      },
      {
        path: "/dashboard/myReviews",
        element: <PrivateRoute> <MyReviews></MyReviews> </PrivateRoute>
      },
      {
        path: "/dashboard/agentProfile",
        element: <PrivateRoute> <AgentProfile></AgentProfile> </PrivateRoute>
      },
      {
        path: "/dashboard/addProperty",
        element: <PrivateRoute> <AddProperty></AddProperty> </PrivateRoute>
      },
      {
        path: "/dashboard/mySoldProperties",
        element: <PrivateRoute> <MySoldProperties></MySoldProperties> </PrivateRoute>
      },
      {
        path: "/dashboard/requestedProperties",
        element: <PrivateRoute> <REquestedProperties></REquestedProperties> </PrivateRoute>
      },
      {
        path: "/dashboard/myAddedProperties",
        element: <PrivateRoute>  <MyAddedProperties></MyAddedProperties>  </PrivateRoute>
      },

      {
        path: "/dashboard/update/:_id",
        element: <PrivateRoute><UpdatedProperty></UpdatedProperty></PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:5000/property/${params._id}`)
      },


      {
        path: "/dashboard/adminProfile",
        element: <PrivateRoute> <AdminProfile></AdminProfile> </PrivateRoute>
      },
      {
        path: "/dashboard/manageProperties",
        element: <PrivateRoute> <ManageProperties></ManageProperties> </PrivateRoute>
      },
      {
        path: "/dashboard/manageUsers",
        element: <PrivateRoute> <ManageUsers></ManageUsers></PrivateRoute>
      },
      {
        path: "/dashboard/manageReviews",
        element: <PrivateRoute> <ManageReviews></ManageReviews> </PrivateRoute>
      }
    ]
  }
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
