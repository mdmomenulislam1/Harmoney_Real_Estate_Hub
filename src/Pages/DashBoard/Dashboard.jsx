import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Dashboard = () => {


  return (
    <div>
      <h2 className="text-3xl">DashBoard</h2>
      <div className="flex">
        <div className="h-screen w-1/3 ">
          <ul className="menu p-5 shadow-lg h-full bg-gray-700 mt-4">
            <li> <NavLink to="/dashboard/myProfile" className="p-5 mb-2   font-bold rounded-lg bg-red-900 text-white">My Profile</NavLink></li>
            <li> <NavLink to="/dashboard/wishlist" className="p-5 mb-2   font-bold rounded-lg bg-red-900 text-white">Wishlist</NavLink></li>
            <li> <NavLink to="/dashboard/propertyBought" className="p-5  mb-2  font-bold rounded-lg bg-red-900 text-white">Property Bought</NavLink></li>
            <li> <NavLink to="/dashboard/myReviews" className="p-5  mb-2  font-bold rounded-lg bg-red-900 text-white">My Reviews</NavLink></li>

            <li> <NavLink to="/dashboard/agentProfile" className="p-5 mb-2   font-bold rounded-lg bg-red-900 text-white">Agent Profile</NavLink></li>
            <li> <NavLink to="/dashboard/AddProperty" className="p-5 mb-2   font-bold rounded-lg bg-red-900 text-white">Add Property</NavLink></li>
            <li> <NavLink to="/dashboard/myAddedProperties" className="p-5 mb-2   font-bold rounded-lg bg-red-900 text-white">My Added Properties</NavLink></li>
            <li> <NavLink to="/dashboard/mySoldProperties" className="p-5  mb-2  font-bold rounded-lg bg-red-900 text-white">My Sold Properties</NavLink></li>
            <li> <NavLink to="/dashboard/requestedProperties" className="p-5  mb-2  font-bold rounded-lg bg-red-900 text-white">Requested Property</NavLink></li>

            <li> <NavLink to="/dashboard/adminProfile" className="p-5 mb-2   font-bold rounded-lg bg-red-900 text-white">Admin Profile</NavLink></li>
            <li> <NavLink to="/dashboard/manageProperties" className="p-5 mb-2   font-bold rounded-lg bg-red-900 text-white">Manage Properties</NavLink></li>
            <li> <NavLink to="/dashboard/manageUsers" className="p-5  mb-2  font-bold rounded-lg bg-red-900 text-white">Manage Users</NavLink></li>
            <li> <NavLink to="/dashboard/manageReviews" className="p-5  mb-2  font-bold rounded-lg bg-red-900 text-white">Manage Reviews</NavLink></li>
          

          </ul>
        </div>
        <div className="w-full">
          <Outlet></Outlet>

        </div>
      </div>

    </div>
  );
};

export default Dashboard;