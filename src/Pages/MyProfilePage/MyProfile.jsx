import React, { useContext } from 'react';
import { AuthContext } from '../../Firebase/AuthProvider';
import useUsers from '../../Hooks/useUsers';
import { FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const MyProfile = () => {
  const [userInfo] = useUsers([]);
  const { user } = useContext(AuthContext);
  const userData = userInfo?.filter((item) => item?.email === user?.email);

  return (
    <div className="mx-4 md:mx-6 lg:mx-10 my-5 md:my-8 lg:my-12 text-center">
      <Helmet>
        <title>{'HRE-hub || My Profile'}</title>
      </Helmet>
      <h2 className="text-3xl text-center border-y-4 p-5 rounded-xl border-blue-800 font-bold">My Profile Info.</h2>

      <div className="">
        <img src={userData[0]?.profile} alt="" className="rounded-lg mx-auto my-3 w-40 h-40" />
        <div className="text-left border-l-4 p-5 my-10 rounded-xl border-pink-800">
          <p className="my-3 font-bold text-green-400">User ID: {userData[0]?._id}</p>
          <p className="my-3 font-bold text-orange-800">Name: {userData[0]?.name}</p>
          <p className="my-3 font-bold">Email: {userData[0]?.email}</p>
          {
            (userData[0]?.role === "Admin" || userData[0]?.role === "Agent") ?
            <p className="my-3 font-bold text-2xl text-blue-700">Role: {userData[0]?.role}</p>
            :
            <></>
          }

          {
            userData[0]?.profession ?
              <p className="my-3 font-bold">Profession : {userData[0]?.profession}</p>
              :
              <></>
          }

          {
            userData[0]?.bod ?
              <p className="my-3 font-bold">Date Of Birth : {userData[0]?.bod}</p>
              :
              <></>
          }

          {
            userData[0]?.bio ?
              <p className="my-3 font-bold">Bio : {userData[0]?.bio}</p>
              :
              <></>
          }

          {
            userData[0]?.presentAddress ?
              <p className="my-3 font-bold">Present Address : {userData[0]?.presentAddress}</p>
              :
              <></>
          }

          {
            userData[0]?.permanentAddress ?
              <p className="my-3 font-bold">Permanent Address : {userData[0]?.permanentAddress}</p>
              :
              <></>
          }


        </div>

      </div>

      <Link to={`/dashboard/editProfile/${userData[0]?._id}`}>
        <button className="hover:bg-yellow-800 bg-pink-800 w-full p-3 text-white font-bold border rounded-b-lg flex justify-center items-center gap-2"> Edit Profile <FaEdit /></button></Link>
    </div>
  );
};

export default MyProfile;