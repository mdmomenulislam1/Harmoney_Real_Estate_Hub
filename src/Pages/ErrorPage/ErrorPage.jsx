import React from 'react';
import { Helmet } from 'react-helmet';

const ErrorPage = () => {
  return (
    <div>
      <Helmet>
        <title>{'HRE-hub || Error Page'}</title>
      </Helmet>
      <img className='w-full h-screen' src="https://i.ibb.co/M2FdmqX/magnifying-4340698-1280.jpg" alt="" />
    </div>
  );
};

export default ErrorPage;