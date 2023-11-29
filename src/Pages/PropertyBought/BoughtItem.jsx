import React from 'react';
import { Link } from 'react-router-dom';
import { FcApproval } from "react-icons/fc";
import { MdBlock } from "react-icons/md";
import { MdPending } from "react-icons/md";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";

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

        <p className="font-bold">
          {
            (status === "Approved") ?
              <div className="text-2xl text-blue-600 flex items-center gap-2">Status: {status} <FcApproval className="" />  </div> : <div>
              </div>
          }
          {
            (status === "Rejected") ?
              <div className="text-2xl text-red-600 flex items-center gap-2">Status: {status} <MdBlock className="bg-red-600 text-white rounded-lg" /> </div> : <div>
              </div>
          }

          {
            (status === "Bought") ?
              <div className="text-2xl text-green-600 flex items-center gap-2">Status: {status} <IoCheckmarkDoneCircleSharp className="bg-green-600 text-white rounded-lg" /> </div> : <div>
              </div>
          }
          {
            (status === "Pending") ?
              <div className="text-2xl text-yellow-600 flex items-center gap-2">Status: {status} <MdPending /> </div> : <div>
              </div>
          }

        </p>

        <p className="font-medium">Status: {status}


        </p>
        <div className="flex gap-3">
          {
            (status === "Approved") ?
              <Link to={`/dashboard/payment/${_id}`}>
                <button className="btn text-2xl font-bold btn-outline border-0 border-b-4 mt-4"> Payment Now </button>
              </Link>
              :

              <></>
          }

          {
            (status === "Bought") ?
              <button className="btn text-2xl font-bold btn-outline border-0 border-b-4 mt-4 disabled"> Done </button>
              :

              <></>
          }

          {
            (status === "Pending") ?

              <button className="btn text-2xl font-bold btn-outline border-0 border-b-4 mt-4 disabled"> Wait for Confirmation </button>

              :
              <></>

          }
          {
            (status === "Rejected") ?
            <button className="btn text-2xl font-bold btn-outline border-0 border-b-4 mt-4 disabled"> Try Again Later  </button>
              :

              <></>
          }
        </div>
      </div>

    </div>
  );
};

export default BoughtItem;