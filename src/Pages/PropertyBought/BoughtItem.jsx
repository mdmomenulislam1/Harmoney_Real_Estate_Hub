import React from 'react';
import { Link } from 'react-router-dom';

const BoughtItem = ({ item }) => {
  const { _id, propertyName, propertyLocation, property_image, agentName, buyerName, buyerEmail, offeredAmount, orderedDate, status } = item;
  return (
    <div className="rounded-lg shadow-lg">
      <img className="h-[300px] rounded-t-lg w-full" src={property_image} alt="" />
      <div class="border-l-8 border-black text-left rounded-b-lg p-3">
        <h3 className="text-2xl font-bold">{propertyName}</h3>
        <p className="font-medium ">{propertyLocation}</p>
        <div className="flex gap-3 my-2 items-center">
          <p className="font-bold ">{agentName}</p>

        </div>
        <p className="font-bold my-2">Price: $ {offeredAmount}</p>
        <p className="font-medium">Status: {status}</p>
        <div className="flex gap-3">
          {
            (status === "Approved") ? 
            <Link to={`/dashboard/payment/${_id}`}>
            <button className="btn text-2xl font-bold btn-outline border-0 border-b-4 mt-4"> Payment Now </button>
          </Link>
          :
          
            <button className="btn text-2xl font-bold btn-outline border-0 border-b-4 mt-4"> Wait for Approval </button>
         
          }
        </div>
      </div>

    </div>
  );
};

export default BoughtItem;