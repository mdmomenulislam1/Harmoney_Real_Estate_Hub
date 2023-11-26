import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaXmark } from "react-icons/fa6";
import { IoMdCheckmark } from "react-icons/io";

const RequestedItem = ({ Item }) => {
  const { _id, offeredAmount, propertyName, propertyLocation, status, buyerName, buyerEmail } = Item || {}
 
  const handleAccept = () => {
    const offeredData = {
      status: "approved"
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
          swal("Okay, Done!", "Request Approved!", "success");
        }
      });
  };

  const handleReject = () => {
    const offeredData = {
      status: "reject"
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