import React from 'react';
import { Link } from 'react-router-dom';

const WishedItem = ({ item }) => {
  const { _id, property_image, property_title, agent_name, agent_image, property_location, price_range, verification_status } = item;
  return (
    <div className="flex justify-between rounded-lg gap-5 md:gap-8 shadow-lg">
      <img className="w-[300px] rounded-l-lg h-full" src={property_image} alt="" />
      <div class="border-r-8 border-black rounded-r-lg pr-2 py-3">
        <h3 className="text-2xl font-bold">{property_title}</h3>
        <p className="font-medium ">{property_location}</p>
        <div className="flex gap-3 my-2 items-center">
          <img src={agent_image} className="rounded-full w-10 h-10" alt="" />
          <p className="font-bold ">{agent_name}</p>

        </div>
        <p className="font-bold my-2">Price Range: {price_range}</p>
        <p className="font-medium">{verification_status}</p>
        <div>


          <button className="btn text-2xl font-bold btn-outline border-0 border-b-4 mt-4"> Make An Offer </button>
          <button className="btn text-2xl font-bold btn-outline border-0 border-b-4 mt-4"> Remove Property </button>
        </div>
      </div>

    </div>
  );
};

export default WishedItem;