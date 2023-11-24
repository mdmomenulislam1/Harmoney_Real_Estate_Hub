import React from 'react';
import Banner from './Banner';
import Promo from './Promo';
import Advertisement from './Advertisement';
import Review from './Review';

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <h1 className=" p-5 mx-10 text-4xl font-bold border-l-8 text-yellow-600 rounded-2xl border-yellow-600 mt-4 md:mt-8 lg:mt-12 ">
        Hot Properties</h1>
      <Advertisement></Advertisement>
      <h1 className=" p-5 mx-10 text-4xl text-right font-bold border-r-8 text-yellow-600 rounded-2xl border-yellow-600 mt-4 md:mt-8 lg:mt-12 ">
        Property Gallery</h1>
      <Promo></Promo>
      <h1 className=" p-5 mx-10 text-4xl font-bold border-l-8 text-yellow-600 rounded-2xl border-yellow-600 mt-4 md:mt-8 lg:mt-12 ">
        Latest Review</h1>
      <Review></Review>

    </div>
  );
};

export default Home;