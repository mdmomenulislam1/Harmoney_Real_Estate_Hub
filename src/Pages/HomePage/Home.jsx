import React from 'react';
import Banner from './Banner';
import Promo from './Promo';
import Advertisement from './Advertisement';
import Review from './Review';
import FAQS from './FAQS';
import { Helmet } from 'react-helmet';

const Home = () => {
  return (
    <div className="mx-4 md:mx-8 lg:mx-12">
      <Helmet>
        <title>{'HRE-hub || Home '}</title>
      </Helmet>
      <Banner></Banner>
      <h2 className="text-3xl text-center border-y-4 p-5 rounded-xl border-blue-800 font-bold"> Hot Property</h2>
      <Advertisement></Advertisement>
      <h2 className="text-3xl text-center border-y-4 p-5 rounded-xl border-blue-800 font-bold">Property Gallery</h2>
      <Promo></Promo>
      <h2 className="text-3xl text-center border-y-4 p-5 rounded-xl border-blue-800 font-bold">Latest Review</h2>
      <Review></Review>
      <h2 className="text-3xl text-center border-y-4 p-5 rounded-xl border-blue-800 font-bold">Frequently Asked Questions</h2>
      <FAQS></FAQS>
    </div>
  );
};

export default Home;