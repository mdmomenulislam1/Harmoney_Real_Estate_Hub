import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Firebase/AuthProvider";


const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleSignOut = () => {
    logOut()
      .then()
      .catch()
  }

  const links = <div className="flex flex-col justify-center items-center md:flex-row gap-5">
    <li><NavLink to="/" className="px-5 py-1 lg:py-2 font-bold rounded-full bg-red-900 text-white">Home </NavLink></li>
    <li><NavLink to="/allProperties" className="px-5 py-1 lg:py-2 font-bold rounded-full bg-red-900 text-white">All Properties</NavLink></li>
    {/* <li><NavLink to="/dashboard" className="px-5 py-1 lg:py-2 font-bold rounded-full bg-red-900 text-white">Dashboard</NavLink></li> */}
    {
      user ?
        <div className="flex flex-col justify-center items-center md:flex-row ">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="px-5 py-1 lg:py-2 font-bold rounded-full bg-red-900 text-white">Dashboard</label>

            <ul tabIndex={0} className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4">
              <li> <NavLink to="/myProfile" className="px-5 mb-2 py-1 lg:py-2 font-bold rounded-full bg-red-900 text-white">My Profile</NavLink></li>
              <li> <NavLink to="/wishlist" className="px-5 mb-2 py-1 lg:py-2 font-bold rounded-full bg-red-900 text-white">Wishlist</NavLink></li>
              <li> <NavLink to="/propertyBought" className="px-5 py-1 lg:py-2 font-bold rounded-full bg-red-900 text-white">Property Bought</NavLink></li>
              <li> <NavLink to="/myReviews" className="px-5 py-1 lg:py-2 font-bold rounded-full bg-red-900 text-white">My Reviews</NavLink></li>
            </ul>
          </div>

          <img src={user.photoURL} alt="" className="w-[50px] h-[50px] rounded-full m-5" />
          <button onClick={handleSignOut} className="px-5 py-1 lg:py-2 font-bold rounded-full bg-red-900 text-white">Log Out</button>
        </div>
        :
        <div>
          <Link to={"/login"} className="flex ">
            <button className="px-5 py-1 lg:py-2 font-bold rounded-full bg-red-900 text-white">Log In</button>
          </Link>
        </div>
    }
  </div>

  return (
    <div className="flex justify-between h-[150px] items-center bg-yellow-600 shadow-lg lg:px-16 lg:py-5">
      <div className="flex justify-between items-center gap-5">
        <div className=" text-black dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex={0} className=" menu mx-20 menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {links}
          </ul>
        </div>
        <div>

          <img className="h-[100px]" src="https://i.ibb.co/LSQ3XnY/image.png" alt="" />
        </div>
      </div>
      <div className="hidden  lg:flex mx-10">
        <ul className="menu menu-horizontal px-1 gap-5">
          {links}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;