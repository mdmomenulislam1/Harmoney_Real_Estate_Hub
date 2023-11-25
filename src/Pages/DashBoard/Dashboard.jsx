import React from 'react';
import { NavLink } from 'react-router-dom';

const Dashboard = () => {


  return (
    <div>
      <h2 className="text-3xl">DashBoard</h2>
      <ul tabIndex={0} className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4">
        <li> <NavLink to="/dashboard/myProfile" className="px-5 mb-2 py-1 lg:py-2 font-bold rounded-full bg-red-900 text-white">My Profile</NavLink></li>
        <li> <NavLink to="/dashboard/wishlist" className="px-5 mb-2 py-1 lg:py-2 font-bold rounded-full bg-red-900 text-white">Wishlist</NavLink></li>
        <li> <NavLink to="/dashboard/propertyBought" className="px-5 py-1 lg:py-2 font-bold rounded-full bg-red-900 text-white">Property Bought</NavLink></li>
        <li> <NavLink to="/dashboard/myReviews" className="px-5 py-1 lg:py-2 font-bold rounded-full bg-red-900 text-white">My Reviews</NavLink></li>
      </ul>
    </div>
  );
};

export default Dashboard;