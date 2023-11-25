import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../../Firebase/AuthProvider';

const AgentProfile = () => {
  const { user } = useContext(AuthContext);
  
  return (
    <div className="text-center">
      <Helmet>
        <title>{'Corner Cafe | My Profile'}</title>
      </Helmet>
      <h1 className="text-center p-5 text-4xl font-bold border-b-8 border-r-8 text-yellow-600 rounded-2xl border-yellow-600 mt-8 md:mt-12 lg:mt-16 ">My Profile Page</h1>

      <div>
        <img src={user?.photoURL} alt="" className="rounded-lg mx-auto my-3" />
        <div>

        </div>
        <p className="my-3 font-bold">Welcome</p>
        <p className="my-3 font-bold text-yellow-600">Name: {user?.displayName}</p>
        <p className="my-3 font-bold">Email: {user?.email}</p>

      </div>


    </div>
  );
};

export default AgentProfile;