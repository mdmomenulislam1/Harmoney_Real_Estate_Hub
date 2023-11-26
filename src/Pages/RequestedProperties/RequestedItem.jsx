import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { FaXmark } from "react-icons/fa6";
import { IoMdCheckmark } from "react-icons/io";

const RequestedItem = ({ Item, setOffer, offer }) => {
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
    <tr key={Item._id} className="text-xl text-slate-500 font-semibold">

      <td className="border-2 border-yellow-600 ">{propertyName}</td>
      <td className="border-2 border-yellow-600 ">{propertyLocation}</td>
      <td className="border-2 border-yellow-600 ">{buyerEmail}</td>
      <td className="border-2 border-yellow-600 ">{buyerName}</td>
      <td className="border-2 border-yellow-600 ">{offeredAmount}</td>
      <td className="border-2 border-yellow-600 ">{status}</td>
      <td className="border-2 border-yellow-600 "><button onClick={handleAccept} className="p-3 font-extrabold text-2xl"> <IoMdCheckmark />  </button></td>
      <td className="border-2 border-yellow-600 "><button onClick={handleReject} className="p-3 font-extrabold text-2xl"><FaXmark /> </button></td>

    </tr>
  );
};

export default RequestedItem;