import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../../Firebase/AuthProvider';
import useUsers from '../../Hooks/useUsers';

const MyProfile = () => {
  const [userInfo] = useUsers([]);
  const { user } = useContext(AuthContext);
  const userData = userInfo?.filter((item) => item?.email === user?.email);

  return (
    <div className="text-center mx-10">
      <Helmet>
        <title>{'Corner Cafe | My Profile'}</title>
      </Helmet>
      <h1 className="text-center p-5 text-4xl font-bold border-b-8 border-r-8 text-yellow-600 rounded-2xl border-yellow-600 mt-8 md:mt-12 lg:mt-16 ">My Profile Page</h1>

      <div className="flex gap-5 justify-center items-center">
        <img src={userData[0]?.profile} alt="" className="rounded-lg mx-auto my-3 w-40 h-40" />
        <div className="text-left">
          <p className="my-3 font-bold">Welcome</p>
          <p className="my-3 font-bold text-yellow-600">Name: {userData[0]?.name}</p>
          <p className="my-3 font-bold">Email: {userData[0]?.email}</p>
          <p className="my-3 font-bold">{userData[0]?.role}</p>
        </div>

      </div>


    </div>
  );
};

export default MyProfile;