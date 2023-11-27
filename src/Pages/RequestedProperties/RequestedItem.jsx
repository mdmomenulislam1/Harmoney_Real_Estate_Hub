import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { FaXmark } from "react-icons/fa6";
import { IoMdCheckmark } from "react-icons/io";

const RequestedItem = ({ Item, setOffer, offer, index }) => {
  const { _id, offeredAmount, propertyName, propertyLocation, status, buyerName, buyerEmail } = Item || {}
 

  const {refetch} = useQuery;
  const handleAccept = () => {
    const offeredData = {
      status: "Approved"
    }

    fetch(`http://localhost:5000/offeredProperty/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(offeredData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          setOffer(offer)
          swal("Okay, Done!", "Request Approved!", "success");

         
        }
      });
  };

  const handleReject = () => {
    const offeredData = {
      status: "Rejected"
    }

    fetch(`http://localhost:5000/offeredProperty/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(offeredData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          setOffer(offer)
          swal("Okay, Done!", "Request Rejected!", "success");
        }
      });
  }

  return (
    <tr key={Item._id} className="text-xl text-pink-800 font-semibold">

      <td className="border-2 border-pink-800 ">{index + 1}</td>
      <td className="border-2 border-pink-800 ">{propertyName}</td>
      <td className="border-2 border-pink-800 ">{propertyLocation}</td>
      <td className="border-2 border-pink-800 ">{buyerEmail}</td>
      <td className="border-2 border-pink-800 ">{buyerName}</td>
      <td className="border-2 border-pink-800 ">{offeredAmount}</td>
      
      
      
      <td className="border-2 border-pink-800 ">
        
        
        {
          status === "Pending" ?
          <div className="font-bold text-yellow-600 text-center">{status}
          <div className="flex items-center justify-center gap-2 my-1">
          <button onClick={handleAccept} className="p-2 font-extrabold text-3xl bg-green-600 text-white rounded-lg"> <IoMdCheckmark  />  </button>
        <button onClick={handleReject} className="p-2 font-extrabold text-3xl bg-red-600 text-white rounded-lg"><FaXmark /> </button>
          </div>
        </div>:
        <div className="font-bold text-2xl text-pink-800 text-center">
        {
          status
        }
        </div>
        }
        
        </td>
      
    </tr>
  );
};

export default RequestedItem;