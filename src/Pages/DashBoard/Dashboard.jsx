import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { AuthContext } from '../../Firebase/AuthProvider';
import useUsers from '../../Hooks/useUsers';
import { CgProfile } from "react-icons/cg";
import { MdOutlineRateReview } from "react-icons/md";
import { MdOutlineAddHomeWork } from "react-icons/md";
import { TbUsersGroup } from "react-icons/tb";
import { FiHome } from "react-icons/fi";
import { LuClipboardList } from "react-icons/lu";
import { AiTwotoneAppstore } from "react-icons/ai";
import { CiLogout } from "react-icons/ci";
import { FaRegWindowRestore } from "react-icons/fa";
import { CiSquareQuestion } from "react-icons/ci";
import { FcAdvertising } from "react-icons/fc";


const Dashboard = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleSignOut = () => {
    logOut()
      .then()
      .catch()
  }

  const [userInfo] = useUsers();
  console.log(userInfo);
  const userData = userInfo?.filter((item) => item?.email === user?.email);
  


  return (
    <div>
     
      <div className="flex">
        <div className="h-screen w-1/4 lg:w-1/6 px-5 pt-10 shadow-2xl shadow-purple-600 bg-cyan-700">
          <ul className="menu">
            {
              (userData[0]?.role !== "Agent" && userData[0]?.role !== "Admin")
                ? <>
                  <li> <NavLink to="/dashboard/myProfile" className="px-3 py-2 font-bold rounded-lg mb-2 bg-pink-700 text-white hover:bg-black"> <CgProfile className=" text-2xl"/> My Profile </NavLink></li>
                  <li> <NavLink to="/dashboard/wishlist" className="px-3 py-2 font-bold rounded-lg mb-2 bg-pink-700 text-white hover:bg-black"> <LuClipboardList className=" text-2xl" /> Wishlist</NavLink></li>
                  <li> <NavLink to="/dashboard/propertyBought" className="px-3 py-2 font-bold rounded-lg mb-2 bg-pink-700 text-white hover:bg-black"> <MdOutlineAddHomeWork className=" text-2xl" /> Property Bought</NavLink></li>
                  <li> <NavLink to="/dashboard/myReviews" className="px-3 py-2 font-bold rounded-lg mb-2 bg-pink-700 text-white hover:bg-black"> <MdOutlineRateReview className=" text-2xl" /> My Reviews</NavLink></li>
                </>
                :
                <>
                </>
            }

            {
              (userData[0]?.role === "Agent") ? <>
                <li> <NavLink to="/dashboard/agentProfile" className="px-3 py-2 font-bold rounded-lg mb-2 bg-pink-700 text-white hover:bg-black"><CgProfile className=" text-2xl"/> Agent Profile</NavLink></li>
                <li> <NavLink to="/dashboard/AddProperty" className="px-3 py-2 font-bold rounded-lg mb-2 bg-pink-700 text-white hover:bg-black"> <MdOutlineAddHomeWork className=" text-2xl" /> Add Property</NavLink></li>
                <li> <NavLink to="/dashboard/myAddedProperties" className="px-3 py-2 font-bold rounded-lg mb-2 bg-pink-700 text-white hover:bg-black"> <FaRegWindowRestore className="text-2xl" /> Added Properties</NavLink></li>
                <li> <NavLink to="/dashboard/mySoldProperties" className="px-3 py-2 font-bold rounded-lg mb-2 bg-pink-700 text-white hover:bg-black">My Sold Properties</NavLink></li>
                <li> <NavLink to="/dashboard/requestedProperties" className="px-3 py-2 font-bold rounded-lg mb-2 bg-pink-700 text-white hover:bg-black">
                <CiSquareQuestion className="text-2xl" /> Requested Property</NavLink></li>
              </>
                :
                <>
                </>}

            {
              (userData[0]?.role === "Admin") ? <>
                <li> <NavLink to="/dashboard/adminProfile" className="px-3 py-2 font-bold rounded-lg mb-2 bg-pink-700 text-white hover:bg-black"> <CgProfile className=" text-2xl"/> Admin Profile</NavLink></li>
                <li> <NavLink to="/dashboard/manageProperties" className="px-3 py-2 font-bold rounded-lg mb-2 bg-pink-700 text-white hover:bg-black"> <MdOutlineAddHomeWork className=" text-2xl" /> Manage Properties</NavLink></li>
                <li> <NavLink to="/dashboard/manageUsers" className="px-3 py-2 font-bold rounded-lg mb-2 bg-pink-700 text-white hover:bg-black"> <TbUsersGroup className=" text-2xl"/> Manage Users</NavLink></li>
                <li> <NavLink to="/dashboard/manageReviews" className="px-3 py-2 font-bold rounded-lg mb-2 bg-pink-700 text-white hover:bg-black"> <MdOutlineRateReview className=" text-2xl" /> Manage Reviews</NavLink></li>
                <li> <NavLink to="/dashboard/advertiseProperty" className="px-3 py-2 font-bold rounded-lg mb-2 bg-pink-700 text-white hover:bg-black"> <FcAdvertising className=" text-2xl" /> Advertise Property</NavLink></li>
              </> : <>
              </>
            }
            <div className="divider h-2 bg-black rounded-full"></div>
            <li> <NavLink to="/" className="px-3 py-2 font-bold rounded-lg mb-2 bg-green-700 text-white hover:bg-black"> <FiHome className="text-2xl" /> Home </NavLink></li>
            <li> <NavLink to="/allProperties" className="px-3 py-2 font-bold rounded-lg mb-2 bg-green-700 text-white hover:bg-black"> <AiTwotoneAppstore className="2xl" /> All Properties</NavLink></li>
            <button onClick={handleSignOut} className="px-3 py-2 font-bold rounded-lg mb-2 bg-green-700 text-white hover:bg-black text-left flex gap-3"> <CiLogout className="text-2xl" /> Log Out</button>

          </ul>
        </div>
        <div className="w-full mx-4 md:mx-6 lg:mx-10 my-5 md:my-8 lg:my-12 text-center">
        <h2 className="text-4xl text-center font-bold text-pink-800"> Dashboard</h2>
          <Outlet></Outlet>

        </div>
      </div>

    </div>
  );
};

export default Dashboard;