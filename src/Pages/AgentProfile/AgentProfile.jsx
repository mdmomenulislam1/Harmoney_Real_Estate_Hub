import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../../Firebase/AuthProvider';
import MyProfile from '../MyProfilePage/MyProfile';

const AgentProfile = () => {
  const { user } = useContext(AuthContext);
  
  return (
    <div className="text-center">
      <Helmet>
        <title>{'Corner Cafe | My Profile'}</title>
      </Helmet>
     
     <MyProfile></MyProfile>


    </div>
  );
};

export default AgentProfile;