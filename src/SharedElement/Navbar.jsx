import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Firebase/AuthProvider";
import { BsEnvelopeDash } from "react-icons/bs";
import { AiTwotoneAppstore } from "react-icons/ai";
import { FiHome } from "react-icons/fi";
import { CiLogin, CiLogout } from "react-icons/ci";
import useUsers from "../Hooks/useUsers";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [userInfo] = useUsers();
  const userData = userInfo?.filter((item) => item?.email === user?.email);

  const handleSignOut = () => {
    logOut()
      .then()
      .catch()
  }

  const links = <div className="flex flex-col justify-center items-center md:flex-row gap-5">
    <li> <NavLink to="/" className="px-3 py-2 font-bold rounded-lg mb-2 bg-green-700 text-white hover:bg-black"> <FiHome className="text-2xl" /> Home </NavLink></li>
    <li> <NavLink to="/allProperties" className="px-3 py-2 font-bold rounded-lg mb-2 bg-green-700 text-white hover:bg-black"> <AiTwotoneAppstore className="2xl" /> All Properties</NavLink></li>

    {
      user ?
        <div className="flex flex-col justify-center items-center md:flex-row ">
          <div className="dropdown dropdown-end">
            <Link to={"/dashboard"} className="flex">
              <button className="px-3 py-2 font-bold rounded-lg mb-2 bg-green-700 text-white flex items-center justify-center gap-2 hover:bg-black"> <BsEnvelopeDash className="text-2xl" /> Dashboard</button>
            </Link>
          </div>

          <img src={userData[0]?.profile} alt="" className="w-[50px] h-[50px] rounded-full m-5" />
          <button onClick={handleSignOut} className="px-3 py-2 font-bold rounded-lg mb-2 bg-green-700 text-white hover:bg-black text-left flex items-center justify-center gap-2"> <CiLogout className="text-2xl" /> Log Out</button>
  </div>
        :
        <div>
          <Link to={"/login"} className="flex ">
            <button className="px-3 py-2 font-bold rounded-lg mb-2 bg-green-700 text-white hover:bg-black text-left flex items-center justify-center gap-2"> <CiLogin className="text-2xl" /> Log In</button>
          </Link>
        </div>
    }
  </div>

  return (
    <div className="flex justify-between h-[80px] items-center bg-pink-700 shadow-lg lg:px-16 lg:py-5">
      <div className="flex justify-between items-center gap-5">
        <div className=" text-black dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex={0} className=" menu mx-20 menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box px-5">
            {links}
          </ul>
        </div>
        <div className="flex items-center gap-2">

          <img className="h-[70px]" src="https://i.ibb.co/yQDKcwT/image-removebg-preview.png" alt="" />
          <h2 className="text-2xl font-bold text-white">Harmony Real Estate Hub</h2>
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