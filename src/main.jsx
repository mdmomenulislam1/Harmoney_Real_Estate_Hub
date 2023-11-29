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
import AdminProfile from './Pages/AdminProfile/AdminProfile.jsx';
import ManageProperties from './Pages/ManageProperties/ManageProperties.jsx';
import ManageUsers from './Pages/ManageUsers/ManageUsers.jsx';
import ManageReviews from './Pages/ManageReviewa/ManageReviews.jsx';
import AddProperty from './Pages/AddProperty/AddProperty.jsx';
import Offered from './Pages/WishlistPage/Offered.jsx';
import Payment from './Pages/PropertyBought/Payment.jsx';
import UpdatedProperty from './Pages/MyAddedPage/UpdatedProperty.jsx';
import AgentRoute from './Firebase/AgentRoute.jsx';
import AdminRoute from './Firebase/AdminRoute.jsx';
import AdvertiseProperty from './Pages/AdvertisePage/AdvertiseProperty.jsx';
import AdvertisementDetails from './Pages/HomePage/AdvertisementDetails.jsx';
import GeneralRoute from './Firebase/GeneralRoute.jsx';
import RequestedProperties from './Pages/RequestedProperties/RequestedProperties.jsx';
import ManageReports from './Pages/ManageReports/ManageReports.jsx';
import EditProfile from './SharedElement/EditProfile.jsx';
import PaymentHistory from './Pages/PropertyBought/PaymentHistory.jsx';

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
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/registration",
        element: <Registration></Registration>
      },
      {
        path: "/advertiseProperty/:_id",
        element: <PrivateRoute> <AdvertisementDetails></AdvertisementDetails> </PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:5000/advertiseProperty/${params._id}`)
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
        element:<GeneralRoute> <MyProfile></MyProfile> </GeneralRoute>
      },
      {
        path: "/dashboard/editProfile/:_id",
        element: <PrivateRoute> <EditProfile></EditProfile> </PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:5000/user/${params._id}`)
      },
      {
        path: "/dashboard/wishlist",
        element:<GeneralRoute> <Wishlist></Wishlist> </GeneralRoute>
      },

      {
        path: "/dashboard/wishlist/:_id",
        element:<GeneralRoute> <Offered></Offered> </GeneralRoute>,
        loader: ({ params }) => fetch(`http://localhost:5000/wishedProperty/${params._id}`)
      },

      {
        path: "/dashboard/payment/:_id",
        element:<GeneralRoute> <Payment></Payment> </GeneralRoute>,
        loader: ({ params }) => fetch(`http://localhost:5000/offeredProperty/${params._id}`)
      },

      {
        path: "/dashboard/propertyBought",
        element:<GeneralRoute> <PropertyBought></PropertyBought> </GeneralRoute>
      },
      {
        path: "/dashboard/myReviews",
        element:<GeneralRoute> <MyReviews></MyReviews> </GeneralRoute>
      },
      {
        path: "/dashboard/myPayment",
        element:<GeneralRoute> <PaymentHistory></PaymentHistory> </GeneralRoute>
      },
      {
        path: "/dashboard/agentProfile",
        element: <AgentRoute>  <AgentProfile></AgentProfile> </AgentRoute>
      },
      {
        path: "/dashboard/addProperty",
        element: <AgentRoute>  <AddProperty></AddProperty> </AgentRoute>
      },
      {
        path: "/dashboard/mySoldProperties",
        element: <AgentRoute>  <MySoldProperties></MySoldProperties> </AgentRoute>
      },
      {
        path: "/dashboard/requestedProperties",
        element: <AgentRoute> <RequestedProperties></RequestedProperties> </AgentRoute>
      },
      {
        path: "/dashboard/myAddedProperties",
        element: <AgentRoute>   <MyAddedProperties></MyAddedProperties>  </AgentRoute>
      },

      {
        path: "/dashboard/update/:_id",
        element: <AgentRoute> <UpdatedProperty></UpdatedProperty></AgentRoute>,
        loader: ({ params }) => fetch(`http://localhost:5000/property/${params._id}`)
      },
      {
        path: "/dashboard/adminProfile",
        element: <AdminRoute> <AdminProfile></AdminProfile> </AdminRoute>
      },
      {
        path: "/dashboard/manageProperties",
        element: <AdminRoute> <ManageProperties></ManageProperties> </AdminRoute>
      },
      {
        path: "/dashboard/manageUsers",
        element: <AdminRoute> <ManageUsers></ManageUsers></AdminRoute>
      },
      {
        path: "/dashboard/manageReviews",
        element: <AdminRoute> <ManageReviews></ManageReviews> </AdminRoute>
      },
      {
        path: "/dashboard/advertiseProperty",
        element: <AdminRoute> <AdvertiseProperty></AdvertiseProperty> </AdminRoute>
      },
      {
        path: "/dashboard/manageReports",
        element: <AdminRoute> <ManageReports></ManageReports>  </AdminRoute>
      },
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
