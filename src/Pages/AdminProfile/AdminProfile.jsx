import React, { useContext } from 'react';
import useUsers from '../../Hooks/useUsers';
import { AuthContext } from '../../Firebase/AuthProvider';
import { Helmet } from 'react-helmet';

const AdminProfile = () => {
  const [userInfo] = useUsers([]);
  const { user } = useContext(AuthContext);
  const userData = userInfo?.filter((item) => item?.email === user?.email);

  return (
    <div className="mx-4 md:mx-6 lg:mx-10 my-5 md:my-8 lg:my-12 text-center">
      <Helmet>
        <title>{'Corner Cafe | Admin Profile'}</title>
      </Helmet>
      <h2 className="text-3xl text-center border-y-4 p-5 rounded-xl border-blue-800 font-bold">Admin Profile</h2>
     
      <div className="flex gap-5 justify-center items-center">
        <img src={userData[0]?.profile} alt="" className="rounded-lg mx-auto my-3 w-40 h-40" />
        <div className="text-left border-l-4 p-5 my-10 rounded-xl border-pink-800">
          <p className="my-3 font-bold">Welcome</p>
          <p className="my-3 font-bold text-orange-800">Name: {userData[0]?.name}</p>
          <p className="my-3 font-bold">Email: {userData[0]?.email}</p>
          <p className="my-3 font-bold">Role: {userData[0]?.role}</p>
        </div>

      </div>


    </div>
  );
};

export default AdminProfile;